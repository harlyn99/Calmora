// ============================================
// IdleBreathing.cs
// Procedural idle breathing animation
// Production-ready physics-based motion
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    public class IdleBreathing : MonoBehaviour
    {
        [Header("Breathing Settings")]
        [SerializeField] private float breathRate = 1f; // Breaths per second
        [SerializeField] private float breathAmplitude = 0.02f; // Scale variation
        [SerializeField] private float breathOffset = 0f; // Phase offset

        [Header("Body Parts")]
        [SerializeField] private Transform bodyRoot;
        [SerializeField] private Transform[] breathingParts; // Parts that expand/contract

        [Header("Advanced Settings")]
        [SerializeField] private AnimationCurve breathCurve = AnimationCurve.EaseInOut(0f, 0f, 1f, 1f);
        [SerializeField] private bool usePerlinNoise = true;
        [SerializeField] private float noiseStrength = 0.3f;
        [SerializeField] private float noiseSpeed = 0.5f;

        [Header("State-Based Modifications")]
        [SerializeField] private float sleepingBreathRateMultiplier = 0.5f;
        [SerializeField] private float excitedBreathRateMultiplier = 2f;
        [SerializeField] private float excitedBreathAmplitudeMultiplier = 1.5f;

        // Current state
        private float _breathTimer;
        private float _currentBreathRate;
        private float _currentBreathAmplitude;
        private Vector3 _originalScale;

        // State machine reference
        private PetStateMachine _stateMachine;

        // Events
        public event Action<float> OnBreathCycle;

        private void Awake()
        {
            if (bodyRoot == null)
            {
                bodyRoot = transform;
            }

            _originalScale = bodyRoot.localScale;
        }

        private void Start()
        {
            _stateMachine = GetComponentInParent<PetStateMachine>();
            _currentBreathRate = breathRate;
            _currentBreathAmplitude = breathAmplitude;
            _breathTimer = breathOffset;
        }

        private void Update()
        {
            UpdateBreathRate();
            UpdateBreathing();
        }

        #region Core Breathing

        private void UpdateBreathing()
        {
            _breathTimer += Time.deltaTime * _currentBreathRate;

            // Calculate breath phase (0 to 1)
            float breathPhase = (_breathTimer % 1f);

            // Apply animation curve for natural breathing
            float breathValue = breathCurve.Evaluate(breathPhase);

            // Add subtle noise for organic feel
            if (usePerlinNoise)
            {
                float noise = Mathf.PerlinNoise(
                    Time.time * noiseSpeed,
                    0f
                ) * noiseStrength;
                breathValue += noise * 0.1f;
            }

            // Calculate scale factor
            float scaleFactor = 1f + (breathValue - 0.5f) * 2f * _currentBreathAmplitude;

            // Apply to body root
            bodyRoot.localScale = _originalScale * scaleFactor;

            // Apply to breathing parts (if any)
            if (breathingParts != null && breathingParts.Length > 0)
            {
                foreach (Transform part in breathingParts)
                {
                    if (part != null)
                    {
                        // Slightly different phase for each part
                        float partPhase = breathPhase + Vector3.Distance(part.position, bodyRoot.position) * 0.1f;
                        float partValue = breathCurve.Evaluate(partPhase % 1f);
                        float partScale = 1f + (partValue - 0.5f) * 2f * _currentBreathAmplitude * 0.5f;
                        part.localScale = Vector3.one * partScale;
                    }
                }
            }

            // Fire event at peak of breath
            if (Mathf.Approximately(breathPhase, 0.5f))
            {
                OnBreathCycle?.Invoke(breathValue);
            }
        }

        private void UpdateBreathRate()
        {
            if (_stateMachine == null) return;

            switch (_stateMachine.CurrentState)
            {
                case PetState.Sleeping:
                    _currentBreathRate = breathRate * sleepingBreathRateMultiplier;
                    _currentBreathAmplitude = breathAmplitude * 0.8f;
                    break;

                case PetState.Playing:
                case PetState.Celebrating:
                    _currentBreathRate = breathRate * excitedBreathRateMultiplier;
                    _currentBreathAmplitude = breathAmplitude * excitedBreathAmplitudeMultiplier;
                    break;

                default:
                    _currentBreathRate = breathRate;
                    _currentBreathAmplitude = breathAmplitude;
                    break;
            }
        }

        #endregion

        #region Public API

        public void SetBreathRate(float rate)
        {
            _currentBreathRate = Mathf.Max(0.1f, rate);
        }

        public void SetBreathAmplitude(float amplitude)
        {
            _currentBreathAmplitude = Mathf.Clamp(amplitude, 0f, 0.1f);
        }

        public void PauseBreathing()
        {
            enabled = false;
        }

        public void ResumeBreathing()
        {
            enabled = true;
        }

        public void TriggerDeepBreath()
        {
            _breathTimer = 0f;
            _currentBreathAmplitude = breathAmplitude * 2f;
            Invoke(nameof(ResetBreathAmplitude), 2f);
        }

        private void ResetBreathAmplitude()
        {
            _currentBreathAmplitude = breathAmplitude;
        }

        #endregion

        #region Utility

        public float GetCurrentBreathPhase()
        {
            return _breathTimer % 1f;
        }

        public bool IsAtBreathPeak()
        {
            float phase = _breathTimer % 1f;
            return Mathf.Approximately(phase, 0.5f);
        }

        public bool IsAtBreathLow()
        {
            float phase = _breathTimer % 1f;
            return Mathf.Approximately(phase, 0f) || Mathf.Approximately(phase, 1f);
        }

        #endregion

        #region Editor Helpers

#if UNITY_EDITOR
        private void OnValidate()
        {
            // Ensure curve is valid
            if (breathCurve.keys.Length < 2)
            {
                breathCurve = AnimationCurve.EaseInOut(0f, 0f, 1f, 1f);
            }
        }

        [ContextMenu("Test Deep Breath")]
        private void TestDeepBreath()
        {
            TriggerDeepBreath();
        }
#endif

        #endregion
    }
}
