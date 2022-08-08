export class LocalStorage {
  public getStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public setStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
