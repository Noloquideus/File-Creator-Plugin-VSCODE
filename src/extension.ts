import * as vscode from 'vscode';
import * as fs from 'fs';

// Интерфейс для элемента быстрого выбора с пользовательскими свойствами
interface CustomQuickPickItem extends vscode.QuickPickItem {
    extension: string;
}

export function activate(context: vscode.ExtensionContext) {
    // Регистрация команды расширения
    let disposable = vscode.commands.registerCommand('simple-create-file.showCreateFileMenu', () => {
        // Создание элемента быстрого выбора
        const quickPick = vscode.window.createQuickPick<CustomQuickPickItem>();

        // Установка элементов выбора
        quickPick.items = [
            { label: 'Создать файл Python', extension: 'py' },
            { label: 'Создать файл JSON', extension: 'json' }
        ];
	});
}