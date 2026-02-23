// ============================================
// VirtualPetRoot.cs
// Main entry point for Virtual Pet System
// Production-ready architecture
// ============================================

using UnityEngine;
using System;
using System.Collections.Generic;

namespace Calmora.VirtualPet
{
    public class VirtualPetRoot : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private MascotScaler mascotScaler;
        [SerializeField] private PetStats petStats;
        [SerializeField] private PetMoodController moodController;
        [SerializeField] private PetStateMachine stateMachine;
        [SerializeField] private PetAnimatorBridge animatorBridge;
        [SerializeField] private PetInteractionController interactionController;
        [SerializeField] private PetLevelSystem levelSystem;
        [SerializeField] private PetSaveSystem saveSystem;

        [Header("Configuration")]
        [SerializeField] private float statDecayRate = 0.5f; // Stats decay per minute
        [SerializeField] private float autoSaveInterval = 30f; // Seconds

        [Header("Events")]
        public event Action<PetMood> OnMoodChanged;
        public event Action<int> OnLevelChanged;
        public event Action OnPetStateChanged;

        // Singleton instance
        public static VirtualPetRoot Instance { get; private set; }

        private float _autoSaveTimer;
        private bool _isInitialized;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
                return;
            }

            InitializeComponents();
        }

        private void Start()
        {
            if (_isInitialized)
            {
                LoadPetData();
                StartStatDecay();
            }
        }

        private void Update()
        {
            if (!_isInitialized) return;

            // Auto-save timer
            _autoSaveTimer += Time.deltaTime;
            if (_autoSaveTimer >= autoSaveInterval)
            {
                SavePetData();
                _autoSaveTimer = 0f;
            }

            // Update mood based on stats
            moodController.UpdateMood(petStats.CurrentStats);
        }

        private void OnApplicationQuit()
        {
            SavePetData();
        }

        private void OnApplicationPause(bool pause)
        {
            if (pause)
            {
                SavePetData();
            }
        }

        #region Initialization

        private void InitializeComponents()
        {
            // Get or create components
            if (mascotScaler == null)
                mascotScaler = GetComponentInChildren<MascotScaler>();
            
            if (petStats == null)
                petStats = GetComponent<PetStats>();
            
            if (moodController == null)
                moodController = GetComponent<PetMoodController>();
            
            if (stateMachine == null)
                stateMachine = GetComponent<PetStateMachine>();
            
            if (animatorBridge == null)
                animatorBridge = GetComponent<PetAnimatorBridge>();
            
            if (interactionController == null)
                interactionController = GetComponent<PetInteractionController>();
            
            if (levelSystem == null)
                levelSystem = GetComponent<PetLevelSystem>();
            
            if (saveSystem == null)
                saveSystem = GetComponent<PetSaveSystem>();

            // Initialize all components
            petStats?.Initialize();
            moodController?.Initialize();
            stateMachine?.Initialize();
            animatorBridge?.Initialize();
            interactionController?.Initialize(this);
            levelSystem?.Initialize();
            saveSystem?.Initialize();

            // Subscribe to events
            if (levelSystem != null)
            {
                levelSystem.OnLevelUp += HandleLevelUp;
            }

            if (moodController != null)
            {
                moodController.OnMoodChanged += HandleMoodChanged;
            }

            _isInitialized = true;
            Debug.Log("[VirtualPetRoot] System initialized successfully");
        }

        #endregion

        #region Data Management

        public void LoadPetData()
        {
            var savedData = saveSystem.LoadPetData();
            if (savedData != null)
            {
                petStats.LoadFromData(savedData.stats);
                levelSystem.LoadFromData(savedData.levelData);
                mascotScaler.SetLevel(levelSystem.CurrentLevel);
                Debug.Log("[VirtualPetRoot] Pet data loaded successfully");
            }
            else
            {
                // Create new pet with default stats
                petStats.ResetToDefault();
                levelSystem.ResetToDefault();
                mascotScaler.SetLevel(1);
                Debug.Log("[VirtualPetRoot] Created new pet with default data");
            }
        }

        public void SavePetData()
        {
            var data = new PetSaveData
            {
                stats = petStats.SaveToData(),
                levelData = levelSystem.SaveToData()
            };
            saveSystem.SavePetData(data);
            Debug.Log("[VirtualPetRoot] Pet data saved");
        }

        #endregion

        #region Stat System

        private void StartStatDecay()
        {
            InvokeRepeating(nameof(DecayStats), 60f, 60f); // Decay every minute
        }

        private void DecayStats()
        {
            if (stateMachine.CurrentState == PetState.Sleeping)
            {
                // Slower decay when sleeping
                petStats.DecayAll(statDecayRate * 0.3f);
            }
            else
            {
                petStats.DecayAll(statDecayRate);
            }
        }

        public void StopStatDecay()
        {
            CancelInvoke(nameof(DecayStats));
        }

        #endregion

        #region Event Handlers

        private void HandleLevelUp(int newLevel)
        {
            mascotScaler.SetLevel(newLevel);
            animatorBridge.TriggerCelebration();
            OnLevelChanged?.Invoke(newLevel);
            SavePetData();
        }

        private void HandleMoodChanged(PetMood newMood)
        {
            OnMoodChanged?.Invoke(newMood);
            UpdateAnimationForMood(newMood);
        }

        private void UpdateAnimationForMood(PetMood mood)
        {
            switch (mood)
            {
                case PetMood.Happy:
                    animatorBridge.SetAnimation("Happy");
                    break;
                case PetMood.Calm:
                    animatorBridge.SetAnimation("Idle");
                    break;
                case PetMood.Hungry:
                    animatorBridge.SetAnimation("Hungry");
                    break;
                case PetMood.Sleepy:
                    animatorBridge.SetAnimation("Sleepy");
                    break;
                case PetMood.Dirty:
                    animatorBridge.SetAnimation("Dirty");
                    break;
                case PetMood.Sad:
                    animatorBridge.SetAnimation("Sad");
                    break;
            }
        }

        #endregion

        #region Public API

        public PetStats GetPetStats() => petStats;
        public PetMoodController GetMoodController() => moodController;
        public PetInteractionController GetInteractionController() => interactionController;
        public PetLevelSystem GetLevelSystem() => levelSystem;
        public MascotScaler GetMascotScaler() => mascotScaler;

        public PetSaveData GetSaveData()
        {
            return new PetSaveData
            {
                stats = petStats.SaveToData(),
                levelData = levelSystem.SaveToData()
            };
        }

        #endregion

        private void OnDestroy()
        {
            if (levelSystem != null)
                levelSystem.OnLevelUp -= HandleLevelUp;
            
            if (moodController != null)
                moodController.OnMoodChanged -= HandleMoodChanged;
        }
    }

    #region Data Classes

    [Serializable]
    public class PetSaveData
    {
        public PetStatsData stats;
        public PetLevelData levelData;
    }

    #endregion
}
