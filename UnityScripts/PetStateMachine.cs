// ============================================
// PetStateMachine.cs
// Behavior state machine for pet AI
// Production-ready with clear states
// ============================================

using UnityEngine;
using System;
using System.Collections.Generic;

namespace Calmora.VirtualPet
{
    public enum PetState
    {
        Idle,
        Eating,
        Sleeping,
        Playing,
        Cleaning,
        Waiting,
        Celebrating
    }

    public class PetStateMachine : MonoBehaviour
    {
        [Header("State Durations")]
        [SerializeField] private float minIdleTime = 2f;
        [SerializeField] private float maxIdleTime = 5f;
        [SerializeField] private float eatingDuration = 3f;
        [SerializeField] private float playingDuration = 5f;
        [SerializeField] private float cleaningDuration = 4f;

        // Current state
        public PetState CurrentState { get; private set; } = PetState.Idle;

        // State history
        private Queue<PetState> _stateHistory = new Queue<PetState>();
        private int _maxHistorySize = 5;

        // Timers
        private float _stateTimer;
        private float _currentStateDuration;

        // Events
        public event Action<PetState> OnStateChanged;
        public event Action<PetState> OnStateEntered;
        public event Action<PetState> OnStateExited;

        private PetStats _petStats;

        public void Initialize()
        {
            _petStats = GetComponent<PetStats>();
            CurrentState = PetState.Idle;
            _currentStateDuration = UnityEngine.Random.Range(minIdleTime, maxIdleTime);
            _stateTimer = 0f;
            Debug.Log("[PetStateMachine] Initialized");
        }

        private void Update()
        {
            UpdateStateTimer();
        }

        #region State Management

        private void UpdateStateTimer()
        {
            _stateTimer += Time.deltaTime;

            if (_stateTimer >= _currentStateDuration)
            {
                OnStateTimedOut();
            }
        }

        private void OnStateTimedOut()
        {
            switch (CurrentState)
            {
                case PetState.Idle:
                    // Transition based on mood/stats
                    TransitionToAppropriateState();
                    break;

                case PetState.Eating:
                    SetState(PetState.Idle);
                    break;

                case PetState.Sleeping:
                    // Check if energy is restored
                    if (_petStats != null && _petStats.CurrentEnergy > 80f)
                    {
                        SetState(PetState.Idle);
                    }
                    break;

                case PetState.Playing:
                    SetState(PetState.Idle);
                    break;

                case PetState.Cleaning:
                    SetState(PetState.Idle);
                    break;

                case PetState.Celebrating:
                    SetState(PetState.Idle);
                    break;
            }
        }

        private void TransitionToAppropriateState()
        {
            if (_petStats == null)
            {
                SetState(PetState.Idle);
                return;
            }

            var stats = _petStats.CurrentStats;

            // Priority-based state selection
            if (stats.energy < 20f)
            {
                SetState(PetState.Sleeping);
            }
            else if (stats.hunger < 25f)
            {
                SetState(PetState.Waiting); // Waiting for food
            }
            else if (stats.cleanliness < 35f)
            {
                SetState(PetState.Waiting); // Waiting for cleaning
            }
            else if (stats.happiness > 70f && stats.energy > 50f)
            {
                SetState(PetState.Idle); // Ready to play
            }
            else
            {
                SetState(PetState.Idle);
            }
        }

        public void SetState(PetState newState)
        {
            if (CurrentState == newState) return;

            // Exit current state
            OnStateExited?.Invoke(CurrentState);

            // Add to history
            _stateHistory.Enqueue(CurrentState);
            if (_stateHistory.Count > _maxHistorySize)
            {
                _stateHistory.Dequeue();
            }

            // Enter new state
            PetState previousState = CurrentState;
            CurrentState = newState;
            _stateTimer = 0f;
            _currentStateDuration = GetStateDuration(newState);

            OnStateChanged?.Invoke(CurrentState);
            OnStateEntered?.Invoke(CurrentState);

            Debug.Log($"[PetStateMachine] State: {previousState} -> {CurrentState}");
        }

        private float GetStateDuration(PetState state)
        {
            switch (state)
            {
                case PetState.Idle:
                    return UnityEngine.Random.Range(minIdleTime, maxIdleTime);
                case PetState.Eating:
                    return eatingDuration;
                case PetState.Playing:
                    return playingDuration;
                case PetState.Cleaning:
                    return cleaningDuration;
                case PetState.Sleeping:
                    return float.MaxValue; // Until energy restored
                case PetState.Celebrating:
                    return 2f;
                default:
                    return 3f;
            }
        }

        #endregion

        #region State Triggers

        public void StartEating()
        {
            SetState(PetState.Eating);
        }

        public void StartPlaying()
        {
            if (CurrentState != PetState.Sleeping)
            {
                SetState(PetState.Playing);
            }
        }

        public void StartCleaning()
        {
            SetState(PetState.Cleaning);
        }

        public void StartSleeping()
        {
            SetState(PetState.Sleeping);
        }

        public void WakeUp()
        {
            if (CurrentState == PetState.Sleeping)
            {
                SetState(PetState.Idle);
            }
        }

        public void Celebrate()
        {
            SetState(PetState.Celebrating);
        }

        #endregion

        #region Utility

        public bool CanInteract()
        {
            return CurrentState != PetState.Sleeping && 
                   CurrentState != PetState.Eating &&
                   CurrentState != PetState.Celebrating;
        }

        public bool IsBusy()
        {
            return CurrentState == PetState.Eating ||
                   CurrentState == PetState.Sleeping ||
                   CurrentState == PetState.Celebrating;
        }

        public PetState GetPreviousState()
        {
            if (_stateHistory.Count == 0) return PetState.Idle;
            
            var states = _stateHistory.ToArray();
            return states[states.Length - 1];
        }

        public bool WasInState(PetState state, int framesAgo = 1)
        {
            if (_stateHistory.Count < framesAgo) return false;
            
            var states = _stateHistory.ToArray();
            return states[states.Length - framesAgo] == state;
        }

        #endregion
    }
}
