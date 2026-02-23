// ============================================
// PetInteractionController.cs
// Handles all user interactions with pet
// Production-ready interaction system
// ============================================

using UnityEngine;
using System;
using System.Collections;

namespace Calmora.VirtualPet
{
    public class PetInteractionController : MonoBehaviour
    {
        [Header("Interaction Settings")]
        [SerializeField] private float interactionCooldown = 0.5f;
        [SerializeField] private float maxInteractionDistance = 3f;

        [Header("Feed Settings")]
        [SerializeField] private float hungerRestoreAmount = 35f;
        [SerializeField] private float happinessFromFood = 10f;
        [SerializeField] private float bondFromFeeding = 5f;

        [Header("Play Settings")]
        [SerializeField] private float happinessFromPlay = 25f;
        [SerializeField] private float energyCostFromPlay = 15f;
        [SerializeField] private float bondFromPlaying = 8f;

        [Header("Sleep Settings")]
        [SerializeField] private float energyRestoreRate = 10f; // per second
        [SerializeField] private float minimumSleepDuration = 3f;

        [Header("Clean Settings")]
        [SerializeField] private float cleanlinessRestoreAmount = 50f;
        [SerializeField] private float happinessFromClean = 15f;
        [SerializeField] private float bondFromCleaning = 5f;

        // References
        private VirtualPetRoot _petRoot;
        private PetStats _petStats;
        private PetStateMachine _stateMachine;
        private PetAnimatorBridge _animator;
        private PetMoodController _moodController;

        // Cooldown
        private float _lastInteractionTime;
        private bool _isInteracting;

        // Events
        public event Action<InteractionType> OnInteractionStarted;
        public event Action<InteractionType> OnInteractionCompleted;
        public event Action<string> OnInteractionFailed;

        public void Initialize(VirtualPetRoot petRoot)
        {
            _petRoot = petRoot;
            _petStats = petRoot.GetPetStats();
            _stateMachine = petRoot.GetStateMachine();
            _animator = petRoot.GetAnimatorBridge();
            _moodController = petRoot.GetMoodController();

            _isInteracting = false;
            Debug.Log("[PetInteractionController] Initialized");
        }

        #region Core Interactions

        /// <summary>
        /// Feed the pet
        /// </summary>
        public void Feed(float foodQuality = 1f)
        {
            if (!CanInteract()) return;

            if (_petStats.CurrentHunger >= 100f)
            {
                OnInteractionFailed?.Invoke("Pet is already full!");
                return;
            }

            StartInteraction(InteractionType.Feed);

            // Apply effects
            float hungerRestore = hungerRestoreAmount * foodQuality;
            float happinessGain = happinessFromFood * foodQuality;
            float bondGain = bondFromFeeding * foodQuality;

            _petStats.ModifyHunger(hungerRestore);
            _petStats.ModifyHappiness(happinessGain);
            _petStats.ModifyBond(bondGain);

            // Trigger animation
            _stateMachine.StartEating();
            _animator.TriggerEating();

            // Complete after eating duration
            Invoke(nameof(CompleteInteraction), 2f);
        }

        /// <summary>
        /// Play with the pet
        /// </summary>
        public void Play(PlayType playType = PlayType.Normal)
        {
            if (!CanInteract()) return;

            if (_petStats.CurrentEnergy < energyCostFromPlay)
            {
                OnInteractionFailed?.Invoke("Pet is too tired to play!");
                return;
            }

            if (_petStats.CurrentHunger < 20f)
            {
                OnInteractionFailed?.Invoke("Pet is too hungry to play!");
                return;
            }

            StartInteraction(InteractionType.Play);

            // Apply effects based on play type
            float happinessGain = happinessFromPlay;
            float energyCost = energyCostFromPlay;
            float bondGain = bondFromPlaying;

            switch (playType)
            {
                case PlayType.Gentle:
                    happinessGain *= 0.7f;
                    energyCost *= 0.5f;
                    break;
                case PlayType.Active:
                    happinessGain *= 1.3f;
                    energyCost *= 1.5f;
                    bondGain *= 1.2f;
                    break;
            }

            _petStats.ModifyHappiness(happinessGain);
            _petStats.ModifyEnergy(-energyCost);
            _petStats.ModifyBond(bondGain);

            // Trigger animation
            _stateMachine.StartPlaying();
            _animator.TriggerPlaying();

            // Complete after playing duration
            Invoke(nameof(CompleteInteraction), 3f);
        }

        /// <summary>
        /// Put pet to sleep
        /// </summary>
        public void Sleep()
        {
            if (!CanInteract()) return;

            StartInteraction(InteractionType.Sleep);

            _stateMachine.StartSleeping();
            _animator.TriggerSleeping();

            // Start energy restoration coroutine
            StartCoroutine(RestoreEnergyCoroutine());
        }

        /// <summary>
        /// Wake up the pet
        /// </summary>
        public void WakeUp()
        {
            if (_stateMachine.CurrentState != PetState.Sleeping) return;

            _stateMachine.WakeUp();
            _animator.TriggerIdle();
            StopCoroutine(nameof(RestoreEnergyCoroutine));
            
            CompleteInteraction();
        }

        /// <summary>
        /// Clean the pet
        /// </summary>
        public void Clean()
        {
            if (!CanInteract()) return;

            if (_petStats.CurrentCleanliness >= 100f)
            {
                OnInteractionFailed?.Invoke("Pet is already clean!");
                return;
            }

            StartInteraction(InteractionType.Clean);

            // Apply effects
            _petStats.ModifyCleanliness(cleanlinessRestoreAmount);
            _petStats.ModifyHappiness(happinessFromClean);
            _petStats.ModifyBond(bondFromCleaning);

            // Trigger animation
            _animator.TriggerHappy();

            // Complete after cleaning duration
            Invoke(nameof(CompleteInteraction), 2f);
        }

        #endregion

        #region Interaction Management

        private bool CanInteract()
        {
            if (_isInteracting) return false;
            if (Time.time - _lastInteractionTime < interactionCooldown) return false;
            if (_stateMachine == null || !_stateMachine.CanInteract()) return false;
            
            return true;
        }

        private void StartInteraction(InteractionType type)
        {
            _isInteracting = true;
            _lastInteractionTime = Time.time;
            OnInteractionStarted?.Invoke(type);
        }

        private void CompleteInteraction()
        {
            _isInteracting = false;
            OnInteractionCompleted?.Invoke(GetCurrentInteractionType());
            _petRoot.SavePetData();
        }

        private InteractionType GetCurrentInteractionType()
        {
            if (_stateMachine.CurrentState == PetState.Eating) return InteractionType.Feed;
            if (_stateMachine.CurrentState == PetState.Playing) return InteractionType.Play;
            if (_stateMachine.CurrentState == PetState.Sleeping) return InteractionType.Sleep;
            if (_stateMachine.CurrentState == PetState.Cleaning) return InteractionType.Clean;
            return InteractionType.None;
        }

        #endregion

        #region Coroutines

        private IEnumerator RestoreEnergyCoroutine()
        {
            float sleepTimer = 0f;

            while (_stateMachine.CurrentState == PetState.Sleeping)
            {
                sleepTimer += Time.deltaTime;
                
                // Minimum sleep duration before can wake
                if (sleepTimer >= minimumSleepDuration)
                {
                    _petStats.ModifyEnergy(energyRestoreRate * Time.deltaTime);
                    
                    // Wake up automatically when energy is full
                    if (_petStats.CurrentEnergy >= 100f)
                    {
                        WakeUp();
                        yield break;
                    }
                }

                yield return null;
            }
        }

        #endregion

        #region Utility

        public enum InteractionType
        {
            None,
            Feed,
            Play,
            Sleep,
            Clean
        }

        public enum PlayType
        {
            Gentle,
            Normal,
            Active
        }

        public bool IsInteracting() => _isInteracting;

        public float GetInteractionCooldownRemaining()
        {
            float elapsed = Time.time - _lastInteractionTime;
            return Mathf.Max(0, interactionCooldown - elapsed);
        }

        #endregion
    }
}
