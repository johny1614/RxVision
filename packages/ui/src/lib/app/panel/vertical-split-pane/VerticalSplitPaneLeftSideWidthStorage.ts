import { Injectable } from '@angular/core';

declare const chrome: any | undefined;

@Injectable({ providedIn: 'root' })
export class VerticalSplitPaneLeftSideWidthStorage {
  private readonly defaultKey = 'leftPanelWidth';

  async load(key?: string): Promise<number | undefined> {
    const storageKey = this.getKey(key);

    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return new Promise<number | undefined>((resolve) => {
          chrome.storage.local.get([storageKey], (res: any) => {
            const val = res?.[storageKey];
            resolve(this.toNumberOrUndef(val));
          });
        });
      }
      const raw = localStorage.getItem(storageKey);
      return this.toNumberOrUndef(raw);
    } catch {
      return undefined;
    }
  }

  save(widthPx: number, key?: string): void {
    if (typeof widthPx !== 'number' || Number.isNaN(widthPx)) return;

    const storageKey = this.getKey(key);
    const val = String(Math.round(widthPx));

    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        chrome.storage.local.set({ [storageKey]: Number(val) });
      } else {
        localStorage.setItem(storageKey, val);
      }
    } catch {
    }
  }

  private getKey(custom?: string): string {
    return custom && custom.trim().length ? custom : this.defaultKey;
  }

  private toNumberOrUndef(input: any): number | undefined {
    const n = Number(input);
    return Number.isFinite(n) ? n : undefined;
  }
}
