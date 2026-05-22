import React, { useState } from 'react';
import { Bell, Mail, CheckCircle, XCircle } from 'lucide-react';
import { isEmailNotificationsConfigured, requestNotificationPermission } from '../services/notificationService';

const NotificationSettings = ({ emailEnabled, onToggleEmail }) => {
  const [browserPermission, setBrowserPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const handleRequestBrowserNotifications = async () => {
    const permission = await requestNotificationPermission();
    setBrowserPermission(permission);
  };

  const emailConfigured = isEmailNotificationsConfigured();

  return (
    <div className="notification-settings">
      <div className="notification-header">
        <Bell size={24} />
        <h3>Настройки уведомлений</h3>
      </div>

      <div className="notification-option">
        <div className="notification-option-info">
          <Mail size={20} />
          <div>
            <h4>Email-уведомления участникам</h4>
            <p>Отправлять письма при новых сообщениях в чате</p>
          </div>
        </div>
        <div className="notification-option-controls">
          {emailConfigured ? (
            <>
              <span className="notification-status notification-status-success">
                <CheckCircle size={16} />
                EmailJS настроен
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={(e) => onToggleEmail(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </>
          ) : (
            <span className="notification-status notification-status-error">
              <XCircle size={16} />
              EmailJS не настроен
            </span>
          )}
        </div>
      </div>

      <div className="notification-option">
        <div className="notification-option-info">
          <Bell size={20} />
          <div>
            <h4>Уведомления браузера</h4>
            <p>Показывать уведомления в браузере</p>
          </div>
        </div>
        <div className="notification-option-controls">
          {browserPermission === 'unsupported' ? (
            <span className="notification-status notification-status-muted">
              Не поддерживается
            </span>
          ) : browserPermission === 'granted' ? (
            <span className="notification-status notification-status-success">
              <CheckCircle size={16} />
              Разрешено
            </span>
          ) : browserPermission === 'denied' ? (
            <span className="notification-status notification-status-error">
              <XCircle size={16} />
              Запрещено
            </span>
          ) : (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleRequestBrowserNotifications}
            >
              Разрешить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
