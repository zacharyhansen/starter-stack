// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DateFormatter {
  public static shortDay(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  }
}
