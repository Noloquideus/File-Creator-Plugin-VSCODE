import * as vscode from 'vscode';
import * as fs from 'fs';

// Интерфейс для элемента быстрого выбора с пользовательскими свойствами
interface CustomQuickPickItem extends vscode.QuickPickItem {
    extension: string;
}