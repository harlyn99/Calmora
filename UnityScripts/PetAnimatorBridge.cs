// ============================================
// PetAnimatorBridge.cs
// Connects pet logic to animation system
// Production-ready animator controller
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    public class PetAnimatorBridge : MonoBehaviour
    {
        [Header("Animator Reference")]
        [SerializeField] private Animator animator;

        [Header("Animation Parameters")]
        [SerializeField] private string idleParam = "Idle";
        [SerializeField] private string eatingParam = "Eating";
        [SerializeField] private string sleepingParam = "Sleeping";
        [SerializeField] private string playingParam = "Playing";
        [SerializeField] private string happyParam = "Happy";
        [SerializeField] private string sadParam = "Sad";
        [SerializeField] private string celebrationParam = "Celebration";

        [Header("Animation Settings")]
        [SerializeField] private float animationCrossfadeTime = 0.2f;
        [SerializeField] private bool useRootMotion = false;

        // Animation state hashes (for performance)
        private int _idleHash;
        private int _eatingHash;
        private int _sleepingHash;
        private int _playingHash;
        private int _happyHash;
        private int _sadHash;
        private int _celebrationHash;

        // Events
        public event Action<string> OnAnimationPlayed;
        public event Action OnAnimationComplete;

        private PetStateMachine _stateMachine;

        public void Initialize()
        {
            if (animator == null)
            {
                animator = GetComponent<Animator>();
            }

            if (animator == null)
            {
                Debug.LogWarning("[PetAnimatorBridge] No Animator found. Using fallback system.");
            }
            else
            {
                // Cache animation hashes
                _idleHash = Animator.StringToHash(idleParam);
                _eatingHash = Animator.StringToHash(eatingParam);
                _sleepingHash = Animator.StringToHash(sleepingParam);
                _playingHash = Animator.StringToHash(playingParam);
                _happyHash = Animator.StringToHash(happyParam);
                _sadHash = Animator.StringToHash(sadParam);
                _celebrationHash = Animator.StringToHash(celebrationParam);

                animator.applyRootMotion = useRootMotion;
            }

            _stateMachine = GetComponent<PetStateMachine>();
            if (_stateMachine != null)
            {
                _stateMachine.OnStateChanged += HandleStateChanged;
            }

            Debug.Log("[PetAnimatorBridge] Initialized");
        }

        private void HandleStateChanged(PetState newState)
        {
            PlayStateAnimation(newState);
        }

        #region Animation Playback

        public void PlayStateAnimation(PetState state)
        {
            switch (state)
            {
                case PetState.Idle:
                    PlayAnimation(idleParam);
                    break;
                case PetState.Eating:
                    PlayAnimation(eatingParam);
                    break;
                case PetState.Sleeping:
                    PlayAnimation(sleepingParam);
                    break;
                case PetState.Playing:
                    PlayAnimation(playingParam);
                    break;
                case PetState.Celebrating:
                    PlayAnimation(celebrationParam);
                    break;
                default:
                    PlayAnimation(idleParam);
                    break;
            }
        }

        public void SetAnimation(string animationName)
        {
            PlayAnimation(animationName);
        }

        private void PlayAnimation(string animationName)
        {
            if (animator != null)
            {
                animator.CrossFadeInFixedTime(animationName, animationCrossfadeTime);
            }

            OnAnimationPlayed?.Invoke(animationName);
            Debug.Log($"[PetAnimatorBridge] Playing: {animationName}");
        }

        #endregion

        #region Specific Animations

        public void TriggerIdle()
        {
            PlayAnimation(idleParam);
        }

        public void TriggerEating()
        {
            PlayAnimation(eatingParam);
        }

        public void TriggerSleeping()
        {
            PlayAnimation(sleepingParam);
        }

        public void TriggerPlaying()
        {
            PlayAnimation(playingParam);
        }

        public void TriggerHappy()
        {
            PlayAnimation(happyParam);
        }

        public void TriggerSad()
        {
            PlayAnimation(sadParam);
        }

        public void TriggerCelebration()
        {
            PlayAnimation(celebrationParam);
            
            // Auto-return to idle after celebration
            Invoke(nameof(TriggerIdle), 1.5f);
        }

        #endregion

        #region Animation Parameters

        public void SetFloat(string paramName, float value)
        {
            if (animator != null)
            {
                animator.SetFloat(paramName, value);
            }
        }

        public void SetBool(string paramName, bool value)
        {
            if (animator != null)
            {
                animator.SetBool(paramName, value);
            }
        }

        public void SetTrigger(string paramName)
        {
            if (animator != null)
            {
                animator.SetTrigger(paramName);
            }
        }

        public void ResetTrigger(string paramName)
        {
            if (animator != null)
            {
                animator.ResetTrigger(paramName);
            }
        }

        #endregion

        #region Blink System

        [Header("Blink Settings")]
        [SerializeField] private float minBlinkInterval = 2f;
        [SerializeField] private float maxBlinkInterval = 6f;
        [SerializeField] private float blinkDuration = 0.15f;

        private float _nextBlinkTime;

        private void Update()
        {
            if (Time.time >= _nextBlinkTime)
            {
                TriggerBlink();
                _nextBlinkTime = Time.time + UnityEngine.Random.Range(minBlinkInterval, maxBlinkInterval);
            }
        }

        public void TriggerBlink()
        {
            if (animator != null)
            {
                animator.SetTrigger("Blink");
            }
        }

        #endregion

        #region Utility

        public bool IsPlaying(string animationName)
        {
            if (animator == null) return false;
            return animator.GetCurrentAnimatorStateInfo(0).IsName(animationName);
        }

        public float GetAnimationNormalizedTime()
        {
            if (animator == null) return 0f;
            return animator.GetCurrentAnimatorStateInfo(0).normalizedTime;
        }

        public void SetAnimationSpeed(float speed)
        {
            if (animator != null)
            {
                animator.speed = speed;
            }
        }

        #endregion

        private void OnDestroy()
        {
            if (_stateMachine != null)
            {
                _stateMachine.OnStateChanged -= HandleStateChanged;
            }
        }
    }
}
