export interface WhatsAppMessagePayload {
  itemTitle: string;
  itemType?: 'tour' | 'service' | 'general';
  customerName?: string;
  phone?: string;
  date?: string;
  peopleCount?: number;
  notes?: string;
}

export function generateWhatsAppLink(
  rawPhoneNumber?: string,
  payload?: WhatsAppMessagePayload
): string {
  // Clean phone number safely: remove +, spaces, dashes, brackets
  const cleanNumber = (rawPhoneNumber || '+995555123456').replace(/[^0-9]/g, '');

  const lines: string[] = [];
  lines.push('🇬🇪 გამარჯობა! მაინტერესებს ინფორმაცია / დაჯავშნა:');
  lines.push('');
  
  if (payload?.itemTitle) {
    const typeLabel = payload.itemType === 'service' ? 'მომსახურება' : 'ტური';
    lines.push(`📌 ${typeLabel}: *${payload.itemTitle}*`);
  }

  if (payload?.date) {
    lines.push(`📅 სასურველი თარიღი: ${payload.date}`);
  }

  if (payload?.peopleCount && payload.peopleCount > 0) {
    lines.push(`👥 ადამიანების რაოდენობა: ${payload.peopleCount}`);
  }

  if (payload?.customerName) {
    lines.push(`👤 სახელი: ${payload.customerName}`);
  }

  if (payload?.phone) {
    lines.push(`📞 საკონტაქტო ნომერი: ${payload.phone}`);
  }

  if (payload?.notes && payload.notes.trim()) {
    lines.push(`📝 კომენტარი / კითხვა: ${payload.notes.trim()}`);
  }

  lines.push('');
  lines.push('გთხოვთ დამიზუსტოთ დეტალები. მადლობა!');

  const fullText = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullText)}`;
}

export function openWhatsAppDirect(
  rawPhoneNumber?: string,
  payload?: WhatsAppMessagePayload
) {
  const url = generateWhatsAppLink(rawPhoneNumber, payload || { itemTitle: 'General Inquiry' });
  window.open(url, '_blank', 'noopener,noreferrer');
}
