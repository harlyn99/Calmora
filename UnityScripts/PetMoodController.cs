// ============================================
// PetMoodController.cs
// Automatic mood determination from stats
// Production-ready state machine
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    public class PetMoodController : MonoBehaviour
    {
        [Header("Mood Thresholds")]
        [SerializeField] private float happyThreshold = 70f;
        [SerializeField] private float hungryThreshold = 30f;
        [SerializeField] private float tiredThreshold = 25f;
        [SerializeField] private float dirtyThreshold = 40f;
        [SerializeField] private float sadThreshold = 30f;

        [Header("Mood Weights")]
        [SerializeField] private float hungerWeight = 1.2f;
        [SerializeField] private float energyWeight = 1.0f;
        [SerializeField] private float happinessWeight = 1.3f;
        [SerializeField] private float cleanlinessWeight = 1.1f;

        // Current mood
        public PetMood CurrentMood { get; private set; } = PetMood.Calm;

        // Events
        public event Action<PetMood> OnMoodChanged;
        public event Action<PetMood, PetMood> OnMoodTransition;

        private PetMood _previousMood;

        public void Initialize()
        {
            CurrentMood = PetMood.Calm;
            _previousMood = CurrentMood;
            Debug.Log("[PetMoodController] Initialized");
        }

        /// <summary>
        /// Update mood based on current stats
        /// Call this every frame or at regular intervals
        /// </summary>
        public void UpdateMood(PetStatsData stats)
        {
            if (stats == null) return;

            _previousMood = CurrentMood;
            CurrentMood = CalculateMood(stats);

            if (CurrentMood != _previousMood)
            {
                OnMoodTransition?.Invoke(_previousMood, CurrentMood);
                OnMoodChanged?.Invoke(CurrentMood);
                Debug.Log($"[PetMoodController] Mood changed: {_previousMood} -> {CurrentMood}");
            }
        }

        /// <summary>
        /// Calculate mood using weighted stat analysis
        /// </summary>
        private PetMood CalculateMood(PetStatsData stats)
        {
            // Priority-based mood determination
            // Critical needs take priority

            // 1. Check critical hunger
            if (stats.hunger < hungryThreshold * hungerWeight)
            {
                return PetMood.Hungry;
            }

            // 2. Check critical energy (sleepy)
            if (stats.energy < tiredThreshold * energyWeight)
            {
                return PetMood.Sleepy;
            }

            // 3. Check cleanliness
            if (stats.cleanliness < dirtyThreshold * cleanlinessWeight)
            {
                return PetMood.Dirty;
            }

            // 4. Check happiness (sad)
            if (stats.happiness < sadThreshold * happinessWeight)
            {
                return PetMood.Sad;
            }

            // 5. Check for happy state
            if (stats.happiness > happyThreshold && 
                stats.hunger > 50f && 
                stats.energy > 50f)
            {
                return PetMood.Happy;
            }

            // Default: Calm
            return PetMood.Calm;
        }

        /// <summary>
        /// Force a specific mood (for special events)
        /// </summary>
        public void ForceMood(PetMood mood, float duration = 0f)
        {
            _previousMood = CurrentMood;
            CurrentMood = mood;
            OnMoodChanged?.Invoke(CurrentMood);

            if (duration > 0f)
            {
                Invoke(nameof(RevertMood), duration);
            }
        }

        private void RevertMood()
        {
            CurrentMood = _previousMood;
            OnMoodChanged?.Invoke(CurrentMood);
        }

        /// <summary>
        /// Get mood description for UI
        /// </summary>
        public static string GetMoodDescription(PetMood mood)
        {
            switch (mood)
            {
                case PetMood.Happy: return "Your pet is feeling joyful and playful!";
                case PetMood.Calm: return "Your pet is relaxed and content.";
                case PetMood.Hungry: return "Your pet is hungry and wants food!";
                case PetMood.Sleepy: return "Your pet is tired and needs rest.";
                case PetMood.Dirty: return "Your pet feels dirty and needs cleaning.";
                case PetMood.Sad: return "Your pet is feeling down. Play with it!";
                default: return "Your pet is feeling okay.";
            }
        }

        /// <summary>
        /// Get mood emoji for UI
        /// </summary>
        public static string GetMoodEmoji(PetMood mood)
        {
            switch (mood)
            {
                case PetMood.Happy: return "😊";
                case PetMood.Calm: return "😌";
                case PetMood.Hungry: return "😋";
                case PetMood.Sleepy: return "😴";
                case PetMood.Dirty: return "😿";
                case PetMood.Sad: return "😢";
                default: return "😐";
            }
        }

        /// <summary>
        /// Get mood color for UI
        /// </summary>
        public static Color GetMoodColor(PetMood mood)
        {
            switch (mood)
            {
                case PetMood.Happy: return new Color(1f, 0.8f, 0.2f);    // Yellow
                case PetMood.Calm: return new Color(0.4f, 0.8f, 0.6f);   // Green
                case PetMood.Hungry: return new Color(1f, 0.5f, 0.3f);   // Orange
                case PetMood.Sleepy: return new Color(0.4f, 0.4f, 0.8f); // Blue
                case PetMood.Dirty: return new Color(0.6f, 0.5f, 0.4f);  // Brown
                case PetMood.Sad: return new Color(0.5f, 0.5f, 0.7f);    // Purple
                default: return Color.white;
            }
        }
    }
}
