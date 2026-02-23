// ============================================
// PetSaveSystem.cs
// JSON-based save/load system
// Production-ready persistence
// ============================================

using UnityEngine;
using System;
using System.IO;

namespace Calmora.VirtualPet
{
    public class PetSaveSystem : MonoBehaviour
    {
        [Header("Save Configuration")]
        [SerializeField] private string saveFileName = "pet_save.json";
        [SerializeField] private bool useEncryption = false;
        [SerializeField] private int encryptionKey = 12345;

        [Header("Auto-Save Settings")]
        [SerializeField] private bool enableAutoSave = true;
        [SerializeField] private float autoSaveInterval = 30f;

        // Save path
        private string _savePath;

        // Events
        public event Action OnSaveCompleted;
        public event Action OnLoadCompleted;
        public event Action<string> OnSaveFailed;
        public event Action<string> OnLoadFailed;

        public void Initialize()
        {
            _savePath = Path.Combine(Application.persistentDataPath, saveFileName);
            Debug.Log($"[PetSaveSystem] Save path: {_savePath}");
        }

        #region Save System

        /// <summary>
        /// Save pet data to JSON file
        /// </summary>
        public void SavePetData(PetSaveData data)
        {
            if (data == null)
            {
                OnSaveFailed?.Invoke("Cannot save null data");
                return;
            }

            try
            {
                // Serialize to JSON
                string json = JsonUtility.ToJson(data, true);

                // Optional encryption
                if (useEncryption)
                {
                    json = Encrypt(json);
                }

                // Write to file
                File.WriteAllText(_savePath, json);

                Debug.Log($"[PetSaveSystem] Data saved successfully to {saveFileName}");
                OnSaveCompleted?.Invoke();
            }
            catch (Exception e)
            {
                Debug.LogError($"[PetSaveSystem] Save failed: {e.Message}");
                OnSaveFailed?.Invoke(e.Message);
            }
        }

        /// <summary>
        /// Load pet data from JSON file
        /// </summary>
        public PetSaveData LoadPetData()
        {
            if (!File.Exists(_savePath))
            {
                Debug.Log("[PetSaveSystem] No save file found. Creating new pet.");
                return null;
            }

            try
            {
                // Read from file
                string json = File.ReadAllText(_savePath);

                // Optional decryption
                if (useEncryption)
                {
                    json = Decrypt(json);
                }

                // Deserialize from JSON
                PetSaveData data = JsonUtility.FromJson<PetSaveData>(json);

                Debug.Log($"[PetSaveSystem] Data loaded successfully from {saveFileName}");
                OnLoadCompleted?.Invoke();
                return data;
            }
            catch (Exception e)
            {
                Debug.LogError($"[PetSaveSystem] Load failed: {e.Message}");
                OnLoadFailed?.Invoke(e.Message);
                
                // Backup corrupted save
                BackupCorruptedSave();
                return null;
            }
        }

        /// <summary>
        /// Delete save file
        /// </summary>
        public void DeleteSave()
        {
            if (File.Exists(_savePath))
            {
                File.Delete(_savePath);
                Debug.Log("[PetSaveSystem] Save file deleted");
            }
        }

        /// <summary>
        /// Check if save exists
        /// </summary>
        public bool SaveExists()
        {
            return File.Exists(_savePath);
        }

        #endregion

        #region Backup System

        private void BackupCorruptedSave()
        {
            string backupPath = _savePath + ".backup";
            
            try
            {
                if (File.Exists(_savePath))
                {
                    File.Copy(_savePath, backupPath, true);
                    Debug.Log($"[PetSaveSystem] Corrupted save backed up to {backupPath}");
                }
            }
            catch (Exception e)
            {
                Debug.LogError($"[PetSaveSystem] Backup failed: {e.Message}");
            }
        }

        public void CreateBackup()
        {
            if (File.Exists(_savePath))
            {
                string timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
                string backupPath = Path.Combine(
                    Application.persistentDataPath,
                    $"pet_save_backup_{timestamp}.json"
                );

                try
                {
                    File.Copy(_savePath, backupPath, false);
                    Debug.Log($"[PetSaveSystem] Backup created: {backupPath}");
                }
                catch (Exception e)
                {
                    Debug.LogError($"[PetSaveSystem] Backup failed: {e.Message}");
                }
            }
        }

        #endregion

        #region Encryption (Simple XOR)

        private string Encrypt(string input)
        {
            char[] chars = input.ToCharArray();
            for (int i = 0; i < chars.Length; i++)
            {
                chars[i] = (char)(chars[i] ^ (char)encryptionKey);
            }
            return new string(chars);
        }

        private string Decrypt(string input)
        {
            // XOR is symmetric, same operation for encrypt/decrypt
            return Encrypt(input);
        }

        #endregion

        #region Utility

        public string GetSavePath() => _savePath;

        public long GetSaveFileSize()
        {
            if (File.Exists(_savePath))
            {
                FileInfo info = new FileInfo(_savePath);
                return info.Length;
            }
            return 0;
        }

        public DateTime GetLastSaveTime()
        {
            if (File.Exists(_savePath))
            {
                FileInfo info = new FileInfo(_savePath);
                return info.LastWriteTime;
            }
            return DateTime.MinValue;
        }

        #endregion
    }

    #region Save Data Class

    [Serializable]
    public class PetSaveData
    {
        public PetStatsData stats;
        public PetLevelData levelData;
    }

    #endregion
}
