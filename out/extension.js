"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
function activate(context) {
    // Регистрация команды расширения
    let disposable = vscode.commands.registerCommand('simple-create-file.showCreateFileMenu', () => {
        // Создание элемента быстрого выбора
        const quickPick = vscode.window.createQuickPick();
        // Установка элементов выбора
        quickPick.items = [
            { label: 'Создать файл Python', extension: 'py' },
            { label: 'Создать файл JSON', extension: 'json' }
        ];
        // Обработчик изменения выбора
        quickPick.onDidChangeSelection((selection) => {
            if (selection && selection[0]) {
                const selected = selection[0];
                // Отображение всплывающего окна для ввода имени файла
                vscode.window.showInputBox({ prompt: 'Введите имя файла' }).then((fileName) => {
                    if (fileName) {
                        const filePath = vscode.workspace.rootPath + '/' + fileName + '.' + selected.extension;
                        // Создание файла с пустым содержимым
                        fs.writeFileSync(filePath, '');
                        // Отображение информационного сообщения об успешном создании файла
                        vscode.window.showInformationMessage(`Создан файл ${selected.label}: ${fileName}`);
                    }
                });
            }
        });
        // Отображение элемента быстрого выбора
        quickPick.show();
    });
    // Добавление подписки на удаление команды при деактивации расширения
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map