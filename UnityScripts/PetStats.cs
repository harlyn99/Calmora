// ============================================
// PetStats.cs
// Manages all pet statistics with decay
// Production-ready with events
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    [Serializable]
    public class PetStatsData
    {
        public float hunger;      // 0-100, higher = more full
        public float energy;      // 0-100, higher = more energy
        public float happiness;   // 0-100, higher = happier
        public float cleanliness; // 0-100, higher = cleaner
        public float bond;        // 0-100, higher = stronger bond
        public int level;
    }

    public class PetStats : MonoBehaviour
    {
        [Header("Base Stats (0-100)")]
        [Range(0f, 100f)] [SerializeField] private float startingHunger = 80f;
        [Range(0f, 100f)] [SerializeField] private float startingEnergy = 80f;
        [Range(0f, 100f)] [SerializeField] private float startingHappiness = 80f;
        [Range(0f, 100f)] [SerializeField] private float startingCleanliness = 100f;
        [Range(0f, 100f)] [SerializeField] private float startingBond = 50f;

        [Header("Stat Limits")]
        [SerializeField] private float minStat = 0f;
        [SerializeField] private float maxStat = 100f;

        [Header("Decay Rates (per minute)")]
        [SerializeField] private float hungerDecay = 5f;
        [SerializeField] private float energyDecay = 3f;
        [SerializeField] private float happinessDecay = 4f;
        [SerializeField] private float cleanlinessDecay = 2f;

        // Current stats (read-only from outside)
        public float CurrentHunger { get; private set; }
        public float CurrentEnergy { get; private set; }
        public float CurrentHappiness { get; private set; }
        public float CurrentCleanliness { get; private set; }
        public float CurrentBond { get; private set; }

        public PetStatsData CurrentStats => new PetStatsData
        {
            hunger = CurrentHunger,
            energy = CurrentEnergy,
            happiness = CurrentHappiness,
            cleanliness = CurrentCleanliness,
            bond = CurrentBond
        };

        // Events
        public event Action<float> OnHungerChanged;
        public event Action<float> OnEnergyChanged;
        public event Action<float> OnHappinessChanged;
        public event Action<float> OnCleanlinessChanged;
        public event Action<float> OnBondChanged;
        public event Action<PetStatsData> OnStatsUpdated;

        public void Initialize()
        {
            ResetToDefault();
            Debug.Log("[PetStats] Initialized");
        }

        public void ResetToDefault()
        {
            CurrentHunger = startingHunger;
            CurrentEnergy = startingEnergy;
            CurrentHappiness = startingHappiness;
            CurrentCleanliness = startingCleanliness;
            CurrentBond = startingBond;
            
            NotifyAllStatsChanged();
        }

        #region Stat Modifiers

        public void ModifyHunger(float amount)
        {
            CurrentHunger = Mathf.Clamp(CurrentHunger + amount, minStat, maxStat);
            OnHungerChanged?.Invoke(CurrentHunger);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        public void ModifyEnergy(float amount)
        {
            CurrentEnergy = Mathf.Clamp(CurrentEnergy + amount, minStat, maxStat);
            OnEnergyChanged?.Invoke(CurrentEnergy);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        public void ModifyHappiness(float amount)
        {
            CurrentHappiness = Mathf.Clamp(CurrentHappiness + amount, minStat, maxStat);
            OnHappinessChanged?.Invoke(CurrentHappiness);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        public void ModifyCleanliness(float amount)
        {
            CurrentCleanliness = Mathf.Clamp(CurrentCleanliness + amount, minStat, maxStat);
            OnCleanlinessChanged?.Invoke(CurrentCleanliness);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        public void ModifyBond(float amount)
        {
            CurrentBond = Mathf.Clamp(CurrentBond + amount, minStat, maxStat);
            OnBondChanged?.Invoke(CurrentBond);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        #endregion

        #region Decay System

        public void DecayAll(float decayMultiplier = 1f)
        {
            ModifyHunger(-hungerDecay * decayMultiplier);
            ModifyEnergy(-energyDecay * decayMultiplier);
            ModifyHappiness(-happinessDecay * decayMultiplier);
            ModifyCleanliness(-cleanlinessDecay * decayMultiplier);
        }

        public void DecayHunger(float amount) => ModifyHunger(-amount);
        public void DecayEnergy(float amount) => ModifyEnergy(-amount);
        public void DecayHappiness(float amount) => ModifyHappiness(-amount);
        public void DecayCleanliness(float amount) => ModifyCleanliness(-amount);

        #endregion

        #region Save/Load

        public PetStatsData SaveToData()
        {
            return new PetStatsData
            {
                hunger = CurrentHunger,
                energy = CurrentEnergy,
                happiness = CurrentHappiness,
                cleanliness = CurrentCleanliness,
                bond = CurrentBond
            };
        }

        public void LoadFromData(PetStatsData data)
        {
            if (data == null)
            {
                Debug.LogWarning("[PetStats] Cannot load from null data");
                return;
            }

            CurrentHunger = data.hunger;
            CurrentEnergy = data.energy;
            CurrentHappiness = data.happiness;
            CurrentCleanliness = data.cleanliness;
            CurrentBond = data.bond;
            
            NotifyAllStatsChanged();
            Debug.Log("[PetStats] Data loaded successfully");
        }

        #endregion

        #region Utility

        public bool IsHungry() => CurrentHunger < 30f;
        public bool IsTired() => CurrentEnergy < 30f;
        public bool IsUnhappy() => CurrentHappiness < 30f;
        public bool IsDirty() => CurrentCleanliness < 40f;

        public float GetAverageStat()
        {
            return (CurrentHunger + CurrentEnergy + CurrentHappiness + CurrentCleanliness) / 4f;
        }

        public PetMood GetDominantMood()
        {
            if (CurrentHunger < 25f) return PetMood.Hungry;
            if (CurrentEnergy < 20f) return PetMood.Sleepy;
            if (CurrentCleanliness < 35f) return PetMood.Dirty;
            if (CurrentHappiness < 25f) return PetMood.Sad;
            if (CurrentHappiness > 70f) return PetMood.Happy;
            return PetMood.Calm;
        }

        private void NotifyAllStatsChanged()
        {
            OnHungerChanged?.Invoke(CurrentHunger);
            OnEnergyChanged?.Invoke(CurrentEnergy);
            OnHappinessChanged?.Invoke(CurrentHappiness);
            OnCleanlinessChanged?.Invoke(CurrentCleanliness);
            OnBondChanged?.Invoke(CurrentBond);
            OnStatsUpdated?.Invoke(CurrentStats);
        }

        #endregion
    }

    #region Enums

    public enum PetMood
    {
        Happy,
        Calm,
        Hungry,
        Sleepy,
        Dirty,
        Sad
    }

    #endregion
}
