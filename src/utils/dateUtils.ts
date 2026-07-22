// Local timezone safe date helper
export const getLocalDateString = (d: Date | string): string => {
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dateObj.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generates datetime-local input string YYYY-MM-DDTHH:mm in local time
export const getLocalDatetimeInputValue = (dateStr?: string): string => {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Cross-browser safe parser for datetime-local input (Safari, iOS, Chrome, Firefox)
export const parseLocalDatetimeInput = (datetimeInputStr: string): Date => {
  if (!datetimeInputStr) return new Date();
  const parts = datetimeInputStr.split('T');
  if (parts.length !== 2) return new Date(datetimeInputStr);

  const [datePart, timePart] = parts;
  const dateComponents = datePart.split('-').map(Number);
  const timeComponents = timePart.split(':').map(Number);

  if (dateComponents.length < 3 || timeComponents.length < 2) {
    return new Date(datetimeInputStr);
  }

  const [year, month, day] = dateComponents;
  const [hours, minutes] = timeComponents;

  // Constructs local Date object explicitly to prevent cross-browser ISO timezone bugs
  return new Date(year, month - 1, day, hours, minutes, 0);
};
