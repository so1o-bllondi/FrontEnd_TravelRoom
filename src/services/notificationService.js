import emailjs from 'emailjs-com';

// Проверка настройки EmailJS
export const isEmailNotificationsConfigured = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const inviteTemplateId = import.meta.env.VITE_EMAILJS_INVITE_TEMPLATE_ID;
  const messageTemplateId = import.meta.env.VITE_EMAILJS_MESSAGE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  return !!(serviceId && (inviteTemplateId || messageTemplateId) && publicKey);
};

// Отправка email-приглашения в поездку
export const sendTripInviteEmail = async (tripData, recipientEmail, organizerName) => {
  if (!isEmailNotificationsConfigured()) {
    console.warn('EmailJS не настроен');
    return false;
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_INVITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!templateId) {
    console.warn('Template ID для приглашений не настроен');
    return false;
  }

  try {
    const templateParams = {
      recipient_email: recipientEmail,
      trip_title: tripData.title,
      trip_city: tripData.city,
      trip_country: tripData.country,
      trip_dates: `${tripData.startDate} — ${tripData.endDate}`,
      organizer_name: organizerName || 'Организатор',
      app_name: 'TravelRoom'
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Ошибка отправки приглашения:', error);
    return false;
  }
};

// Отправка email-уведомления о новом сообщении в чате
export const sendChatMessageEmail = async (tripTitle, tripCity, authorName, messageText, recipientEmail) => {
  if (!isEmailNotificationsConfigured()) {
    console.warn('EmailJS не настроен');
    return false;
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_MESSAGE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!templateId) {
    console.warn('Template ID для сообщений не настроен');
    return false;
  }

  try {
    const templateParams = {
      trip_title: tripTitle,
      trip_city: tripCity,
      sender_name: authorName,
      message_text: messageText,
      recipient_email: recipientEmail,
      app_name: 'TravelRoom'
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
};

// Уведомить участников поездки о новом сообщении
export const notifyTripParticipants = async (trip, authorName, messageText, emailNotificationsEnabled) => {
  if (!emailNotificationsEnabled || !isEmailNotificationsConfigured()) {
    return { sent: 0, failed: 0 };
  }

  // Получаем email участников (кроме автора сообщения)
  const participantEmails = trip.participants
    .filter(p => typeof p === 'object' && p.email && p.email !== authorName)
    .map(p => p.email);

  if (participantEmails.length === 0) {
    return { sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  for (const email of participantEmails) {
    const success = await sendChatMessageEmail(
      trip.title,
      trip.city,
      authorName,
      messageText,
      email
    );

    if (success) {
      sent++;
    } else {
      failed++;
    }
  }

  return { sent, failed };
};

// Отправить приглашения всем участникам поездки
export const sendTripInvitations = async (trip, organizerName) => {
  if (!isEmailNotificationsConfigured()) {
    return { sent: 0, failed: 0 };
  }

  const participantEmails = trip.participants
    .filter(p => typeof p === 'object' && p.email)
    .map(p => p.email);

  if (participantEmails.length === 0) {
    return { sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  for (const email of participantEmails) {
    const success = await sendTripInviteEmail(trip, email, organizerName);

    if (success) {
      sent++;
    } else {
      failed++;
    }
  }

  return { sent, failed };
};

// Browser Notifications API
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
};

export const showBrowserNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.warn('Browser notifications не поддерживаются');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
};
