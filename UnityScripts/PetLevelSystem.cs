// ============================================
// PetLevelSystem.cs
// Manages pet leveling and growth
// Production-ready progression system
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    [Serializable]
    public class PetLevelData
    {
        public int currentLevel;
        public float currentXP;
        public float totalXP;
    }

    public class PetLevelSystem : MonoBehaviour
    {
        [Header("Level Configuration")]
        [SerializeField] private int maxLevel = 50;
        [SerializeField] private float baseXPRequired = 100f;
        [SerializeField] private float xpScalingFactor = 1.5f; // XP required increases by this factor each level

        [Header("Growth Settings")]
        [SerializeField] private float scaleIncreasePerLevel = 0.02f; // 2% size increase per level
        [SerializeField] private float minScale = 0.8f;
        [SerializeField] private float maxScale = 1.5f;

        [Header("XP Sources")]
        [SerializeField] private float xpFromFeed = 10f;
        [SerializeField] private float xpFromPlay = 25f;
        [SerializeField] private float xpFromClean = 15f;
        [SerializeField] private float xpFromSleep = 20f;
        [SerializeField] private float xpPerBondPoint = 0.5f;

        // Current state
        public int CurrentLevel { get; private set; } = 1;
        public float CurrentXP { get; private set; } = 0f;
        public float TotalXP { get; private set; } = 0f;
        public float XPToNextLevel { get; private set; }

        // Events
        public event Action<int> OnLevelUp;
        public event Action<int, float, float> OnXPChanged;
        public event Action<float> OnScaleChanged;

        private float _currentScale = 1f;
        private PetStats _petStats;

        public void Initialize()
        {
            _petStats = GetComponent<PetStats>();
            CurrentLevel = 1;
            CurrentXP = 0f;
            TotalXP = 0f;
            _currentScale = 1f;
            XPToNextLevel = CalculateXPForLevel(CurrentLevel);
            
            Debug.Log($"[PetLevelSystem] Initialized at Level {CurrentLevel}");
        }

        public void ResetToDefault()
        {
            CurrentLevel = 1;
            CurrentXP = 0f;
            TotalXP = 0f;
            _currentScale = 1f;
            XPToNextLevel = CalculateXPForLevel(CurrentLevel);
        }

        #region XP System

        public void AddXP(float amount, XPSource source = XPSource.Interaction)
        {
            if (CurrentLevel >= maxLevel)
            {
                Debug.Log("[PetLevelSystem] Max level reached!");
                return;
            }

            // Apply any source-specific modifiers
            float modifiedAmount = ApplySourceModifiers(amount, source);

            CurrentXP += modifiedAmount;
            TotalXP += modifiedAmount;

            // Add bonus XP based on bond
            if (_petStats != null)
            {
                float bondBonus = _petStats.CurrentBond * xpPerBondPoint * 0.01f;
                CurrentXP += bondBonus;
                TotalXP += bondBonus;
            }

            OnXPChanged?.Invoke(CurrentLevel, CurrentXP, XPToNextLevel);

            // Check for level up
            if (CurrentXP >= XPToNextLevel)
            {
                LevelUp();
            }

            Debug.Log($"[PetLevelSystem] Added {modifiedAmount} XP from {source}. Total: {CurrentXP}/{XPToNextLevel}");
        }

        private float ApplySourceModifiers(float amount, XPSource source)
        {
            switch (source)
            {
                case XPSource.Feed:
                    return amount;
                case XPSource.Play:
                    return amount * 1.2f; // 20% bonus for playing
                case XPSource.Clean:
                    return amount;
                case XPSource.Sleep:
                    return amount * 1.1f; // 10% bonus for sleeping
                case XPSource.Bond:
                    return amount * 1.5f; // 50% bonus for bond activities
                default:
                    return amount;
            }
        }

        private void LevelUp()
        {
            CurrentLevel++;
            CurrentXP -= XPToNextLevel;
            XPToNextLevel = CalculateXPForLevel(CurrentLevel);

            // Increase scale
            _currentScale = Mathf.Clamp(
                1f + (CurrentLevel - 1) * scaleIncreasePerLevel,
                minScale,
                maxScale
            );

            OnLevelUp?.Invoke(CurrentLevel);
            OnScaleChanged?.Invoke(_currentScale);

            Debug.Log($"[PetLevelSystem] LEVEL UP! Now Level {CurrentLevel}");
        }

        private float CalculateXPForLevel(int level)
        {
            return baseXPRequired * Mathf.Pow(xpScalingFactor, level - 1);
        }

        #endregion

        #region Interaction XP Rewards

        public void OnFeed()
        {
            AddXP(xpFromFeed, XPSource.Feed);
        }

        public void OnPlay()
        {
            AddXP(xpFromPlay, XPSource.Play);
        }

        public void OnClean()
        {
            AddXP(xpFromClean, XPSource.Clean);
        }

        public void OnSleep()
        {
            AddXP(xpFromSleep, XPSource.Sleep);
        }

        public void OnBondIncrease(float bondGained)
        {
            AddXP(bondGained * xpPerBondPoint, XPSource.Bond);
        }

        #endregion

        #region Save/Load

        public PetLevelData SaveToData()
        {
            return new PetLevelData
            {
                currentLevel = CurrentLevel,
                currentXP = CurrentXP,
                totalXP = TotalXP
            };
        }

        public void LoadFromData(PetLevelData data)
        {
            if (data == null)
            {
                Debug.LogWarning("[PetLevelSystem] Cannot load from null data");
                return;
            }

            CurrentLevel = Mathf.Clamp(data.currentLevel, 1, maxLevel);
            CurrentXP = data.currentXP;
            TotalXP = data.totalXP;
            XPToNextLevel = CalculateXPForLevel(CurrentLevel);

            // Recalculate scale
            _currentScale = Mathf.Clamp(
                1f + (CurrentLevel - 1) * scaleIncreasePerLevel,
                minScale,
                maxScale
            );

            OnScaleChanged?.Invoke(_currentScale);
            Debug.Log($"[PetLevelSystem] Loaded Level {CurrentLevel} with {CurrentXP} XP");
        }

        #endregion

        #region Utility

        public float GetProgressToNextLevel()
        {
            return CurrentXP / XPToNextLevel;
        }

        public int GetLevel() => CurrentLevel;

        public float GetScale() => _currentScale;

        public bool IsMaxLevel() => CurrentLevel >= maxLevel;

        public float GetTotalXPForLevel(int level)
        {
            float total = 0f;
            for (int i = 1; i < level; i++)
            {
                total += CalculateXPForLevel(i);
            }
            return total;
        }

        public enum XPSource
        {
            Interaction,
            Feed,
            Play,
            Clean,
            Sleep,
            Bond
        }

        #endregion
    }
}
