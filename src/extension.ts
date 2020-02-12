// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { InputBoxOptions, window, commands, ExtensionContext, TextEditorEdit } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


export async function optionsAwaiter(prompt: string, placeHolder: string){
	const options: InputBoxOptions = {
		prompt,
		placeHolder
	};
	return await window.showInputBox(options).then(value =>{
		return value ? value : placeHolder;
	});
}

export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('extension.styledConsole', async () => {

		const textResult: string  = await optionsAwaiter("Console log text: ", "sampleText");
		const backgroundColorResult: string = await optionsAwaiter("Text Color: ", "#FFFFFF");
		const colorResult: string = await optionsAwaiter("Background color: ", "#000000");
		const fontSizeResult: string = await optionsAwaiter("Font Size: ", "12");
						
		// Get active text editor
		let textEditor = window.activeTextEditor;

		// Ignore if no active TextEditor
		if (typeof(textEditor) === 'undefined') {
			return false;
		}
		await textEditor.edit((edit: TextEditorEdit)=>{
			if(window.activeTextEditor?.selection.active){
				edit.insert(window.activeTextEditor?.selection.active, "console.log(\"%c "+ textResult +" \",\"background-color:"+backgroundColorResult+";color:"+colorResult+";font-size:"+fontSizeResult.replace("px","")+"px;\");");
			}
		})
		return;

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
