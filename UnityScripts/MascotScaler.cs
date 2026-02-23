// ============================================
// MascotScaler.cs
// Handles pet scaling based on level
// Production-ready proportion system
// ============================================

using UnityEngine;
using System;

namespace Calmora.VirtualPet
{
    public class MascotScaler : MonoBehaviour
    {
        [Header("Base Scale")]
        [SerializeField] private float baseScale = 1f;

        [Header("Level Scaling")]
        [SerializeField] private float scalePerLevel = 0.02f; // 2% per level
        [SerializeField] private float minScale = 0.8f;
        [SerializeField] private float maxScale = 1.5f;

        [Header("Character Scale Spec")]
        [Range(0f, 1f)] [SerializeField] private float bodyHeightRatio = 0.7f;
        [Range(0f, 1f)] [SerializeField] private float faceHeightRatio = 0.3f;
        [Range(0f, 1f)] [SerializeField] private float eyeSizeRatio = 0.05f;
        [Range(0f, 1f)] [SerializeField] private float eyeSpacingRatio = 0.35f;
        [Range(0f, 1f)] [SerializeField] private float earHeightRatio = 0.25f;
        [Range(0f, 1f)] [SerializeField] private float tailSizeRatio = 0.18f;
        [Range(0f, 1f)] [SerializeField] private float armLengthRatio = 0.22f;
        [Range(0f, 1f)] [SerializeField] private float legSizeRatio = 0.18f;

        // Current scale
        public float CurrentScale { get; private set; } = 1f;
        public int CurrentLevel { get; private set; } = 1;

        // Transform reference
        [SerializeField] private Transform targetTransform;

        // Events
        public event Action<float> OnScaleChanged;
        public event Action<int, float> OnLevelScaled;

        private Vector3 _originalScale;

        private void Awake()
        {
            if (targetTransform == null)
            {
                targetTransform = transform;
            }

            _originalScale = targetTransform.localScale;
            CurrentScale = baseScale;
        }

        public void Initialize()
        {
            SetLevel(1);
            Debug.Log("[MascotScaler] Initialized");
        }

        #region Scale Management

        public void SetLevel(int level)
        {
            CurrentLevel = Mathf.Max(1, level);
            CalculateAndApplyScale();
        }

        public void AddLevel(int levels)
        {
            SetLevel(CurrentLevel + levels);
        }

        private void CalculateAndApplyScale()
        {
            // Calculate scale based on level
            float levelScale = 1f + (CurrentLevel - 1) * scalePerLevel;
            CurrentScale = Mathf.Clamp(baseScale * levelScale, minScale, maxScale);

            ApplyScale();
            OnLevelScaled?.Invoke(CurrentLevel, CurrentScale);
        }

        public void ApplyScale()
        {
            if (targetTransform != null)
            {
                targetTransform.localScale = _originalScale * CurrentScale;
                OnScaleChanged?.Invoke(CurrentScale);
            }
        }

        public void SetScale(float scale)
        {
            CurrentScale = Mathf.Clamp(scale, minScale, maxScale);
            ApplyScale();
        }

        #endregion

        #region Proportion Getters

        /// <summary>
        /// Get body height based on total height
        /// </summary>
        public float GetBodyHeight(float totalHeight)
        {
            return totalHeight * bodyHeightRatio;
        }

        /// <summary>
        /// Get face height based on total height
        /// </summary>
        public float GetFaceHeight(float totalHeight)
        {
            return totalHeight * faceHeightRatio;
        }

        /// <summary>
        /// Get eye size based on head width
        /// </summary>
        public float GetEyeSize(float headWidth)
        {
            return headWidth * eyeSizeRatio;
        }

        /// <summary>
        /// Get eye spacing based on head width
        /// </summary>
        public float GetEyeSpacing(float headWidth)
        {
            return headWidth * eyeSpacingRatio;
        }

        /// <summary>
        /// Get ear height based on body height
        /// </summary>
        public float GetEarHeight(float bodyHeight)
        {
            return bodyHeight * earHeightRatio;
        }

        /// <summary>
        /// Get tail size based on body height
        /// </summary>
        public float GetTailSize(float bodyHeight)
        {
            return bodyHeight * tailSizeRatio;
        }

        /// <summary>
        /// Get arm length based on body height
        /// </summary>
        public float GetArmLength(float bodyHeight)
        {
            return bodyHeight * armLengthRatio;
        }

        /// <summary>
        /// Get leg size based on body height
        /// </summary>
        public float GetLegSize(float bodyHeight)
        {
            return bodyHeight * legSizeRatio;
        }

        #endregion

        #region Proportion Setters (for customization)

        public void SetBodyHeightRatio(float ratio)
        {
            bodyHeightRatio = Mathf.Clamp01(ratio);
        }

        public void SetFaceHeightRatio(float ratio)
        {
            faceHeightRatio = Mathf.Clamp01(ratio);
        }

        public void SetEyeSizeRatio(float ratio)
        {
            eyeSizeRatio = Mathf.Clamp01(ratio);
        }

        public void SetEyeSpacingRatio(float ratio)
        {
            eyeSpacingRatio = Mathf.Clamp01(ratio);
        }

        public void SetEarHeightRatio(float ratio)
        {
            earHeightRatio = Mathf.Clamp01(ratio);
        }

        public void SetTailSizeRatio(float ratio)
        {
            tailSizeRatio = Mathf.Clamp01(ratio);
        }

        public void SetArmLengthRatio(float ratio)
        {
            armLengthRatio = Mathf.Clamp01(ratio);
        }

        public void SetLegSizeRatio(float ratio)
        {
            legSizeRatio = Mathf.Clamp01(ratio);
        }

        #endregion

        #region Animation Support

        [Header("Animation Scale Support")]
        [SerializeField] private bool supportSquashStretch = true;
        [SerializeField] private float maxSquash = 0.85f;
        [SerializeField] private float maxStretch = 1.15f;

        public void Squash(float amount)
        {
            if (!supportSquashStretch) return;

            float scale = Mathf.Clamp(1f - amount, maxSquash, 1f);
            targetTransform.localScale = new Vector3(
                _originalScale.x * (2f - scale), // Widen when squashing
                _originalScale.y * scale,
                _originalScale.z * (2f - scale)
            );
        }

        public void Stretch(float amount)
        {
            if (!supportSquashStretch) return;

            float scale = Mathf.Clamp(1f + amount, 1f, maxStretch);
            targetTransform.localScale = new Vector3(
                _originalScale.x * (2f - scale), // Narrow when stretching
                _originalScale.y * scale,
                _originalScale.z * (2f - scale)
            );
        }

        public void ResetTransform()
        {
            targetTransform.localScale = _originalScale * CurrentScale;
        }

        #endregion

        #region Utility

        public float GetCurrentScale() => CurrentScale;
        public int GetCurrentLevel() => CurrentLevel;

        public Vector3 GetScaledSize(Vector3 originalSize)
        {
            return originalSize * CurrentScale;
        }

        public float GetScaleProgress(int maxLevel)
        {
            return (float)(CurrentLevel - 1) / (maxLevel - 1);
        }

        #endregion

        #region Editor Helpers

#if UNITY_EDITOR
        [ContextMenu("Reset to Base Scale")]
        private void ResetScale()
        {
            SetLevel(1);
        }

        [ContextMenu("Preview Max Scale")]
        private void PreviewMaxScale()
        {
            SetScale(maxScale);
        }

        [ContextMenu("Preview Min Scale")]
        private void PreviewMinScale()
        {
            SetScale(minScale);
        }
#endif

        #endregion
    }
}
