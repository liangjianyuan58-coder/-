import { useState } from 'react'
import { setManagerPin, clearManagerPin, hasManagerAccess } from '../utils/managerAuth'

export default function ManagerSetup({ onClose }) {
  const [pin, setPin] = useState('')
  const [saved, setSaved] = useState(false)
  const isSet = hasManagerAccess()

  const handleSave = () => {
    if (pin.length < 4) return
    setManagerPin(pin)
    setSaved(true)
    setTimeout(onClose, 1200)
  }

  const handleClear = () => {
    clearManagerPin()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-title">⚙️ 管理者設定</div>
        <p className="modal-desc">
          PINを設定した端末では、共有URLを開いたときにマネジメント分析が自動表示されます。
          メンバーの端末には表示されません。
        </p>

        {!saved ? (
          <>
            <input
              className="pin-input"
              type="password"
              inputMode="numeric"
              placeholder="4桁以上のPINを入力"
              maxLength={8}
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
            />
            <button
              className="btn-save-pin"
              onClick={handleSave}
              disabled={pin.length < 4}
            >
              この端末をマネージャー端末に設定
            </button>
            {isSet && (
              <button className="btn-clear-pin" onClick={handleClear}>
                マネージャー設定を解除する
              </button>
            )}
          </>
        ) : (
          <div className="pin-saved">設定しました</div>
        )}

        <button className="btn-modal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  )
}
