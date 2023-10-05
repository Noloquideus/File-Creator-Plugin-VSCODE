## Зависимости
Для работы расширения необходимо импортировать две внешние зависимости:

vscode - модуль, предоставляющий API для взаимодействия с средой разработки Visual Studio Code.
fs - модуль для работы с файловой системой.
Интерфейс
Расширение определяет пользовательский интерфейс CustomQuickPickItem, основанный на интерфейсе vscode.QuickPickItem. Он расширяет стандартные свойства элемента быстрого выбора и добавляет свойство extension, которое представляет расширение файла.

## Добавление своих расширений файлов
Создайте свое расширение по примеру
```
quickPick.items = [
            { label: 'Создать файл Python', extension: 'py' },
            { label: 'Создать файл JSON', extension: 'json' }
        ];
```

## Активация и деактивация расширения
Функции activate и deactivate используются для активации и деактивации расширения соответственно. В функции activate происходит регистрация команды расширения, которая будет вызываться при отображении меню создания файла.

## Функция activate
```
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-create-file.showCreateFileMenu', () => {
        // Создание элемента быстрого выбора
        const quickPick = vscode.window.createQuickPick<CustomQuickPickItem>();

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
```
Функция activate регистрирует команду расширения с именем 'simple-create-file.showCreateFileMenu'. При вызове этой команды будет отображено меню быстрого выбора, в котором пользователь может выбрать тип файла для создания. Затем пользователю предлагается ввести имя файла через всплывающее окно. После ввода имени файла, функция создает файл указанного типа с указанным именем в корневой папке рабочей области. После успешного создания файла отображается информационное сообщение.

## Функция deactivate
```export function deactivate() {}```

Функция deactivate пустая и не выполняет никаких действий. Она предоставляется для совместимости и может быть использована для освобождения ресурсов или выполнения других действий при деактивации расширения.