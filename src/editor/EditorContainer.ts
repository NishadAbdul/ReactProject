import Quill, { QuillOptionsStatic, RangeStatic } from 'quill';
import { getTransliterateSuggestions } from 'react-transliterate';

type quillKeyHanderPropsType = {
    event: any,
    quillEditor: Quill,
    suggestionConfiguration: any,
    setSuggestionConfiguration: any,
    setSuggestionsMenuOpen: any,
    setSuggestions: any,
    lang: string,
    setSuggestionDropDownStyle: any,
    selectionConfiguration: any
};

type quillTextChangeHandlerPropsType = {
    quillEditor: Quill,
    delta: any,
    oldDelta: any,
    source: any,
    suggestionConfiguration: any,
    setSuggestionConfiguration: any,
    setSuggestionsMenuOpen: any,
    setSuggestions: any,
    lang: string
}

type setSuggestionBoxPositionPropsType = {
    quillEditor: Quill,
    selectionIndex: number,
    setSuggestionDropDownStyle: any
}

type suggestionChangeHandlerPropsType = {
    event: any,
    quillEditor: Quill,
    suggestionConfiguration: any,
    setSuggestionConfiguration: any,
    setSuggestionsMenuOpen: any,
}

type setSuggestionsValuesPropsType = {
    pressedKey: any,
    lang: string,
    setSuggestionConfiguration: any,
    setSuggestions: any,
    suggestionConfiguration: any,
    selectionIndex: number,
    quillEditor: Quill,
    setSuggestionsMenuOpen: any
}

type editorSelectionChangeHandlerPropsType = {
    range: RangeStatic,
    setSelectionConfiguration: any
}

type loadContentPropsType = {
    content: any,
    setSuggestionConfiguration: any
}

export class EditorContainer {
    public static suggestionChangeHandler = (props: suggestionChangeHandlerPropsType) => {
        props.quillEditor.focus();

        var selection = props.quillEditor.getSelection();
        let selectionIndex: number = 0;
        if (selection != null) {
            selectionIndex = selection.index;
        }

        // console.log('at editorContainer - suggestionChangeHandler with event: ', props.event);
        // console.log('at Editor - suggestionChangeHandler with item: ', event.target.innerText, ' startIndex: ', suggestionConfiguration.startIndex, ' currentIndex: ', suggestionConfiguration.currentIndex);
        const selectedValue = props.event.value;
        const insertingIndex = selectionIndex - props.suggestionConfiguration.text.length - 1;

        props.quillEditor.deleteText(insertingIndex, props.suggestionConfiguration.text.length);
        props.quillEditor.insertText(insertingIndex, selectedValue);

        props.setSuggestionConfiguration({
            // startIndex: selectionIndex + selectedValue.length - 1,
            // currentIndex: selectionIndex + selectedValue.length - 1,
            text: ''
        });

        props.setSuggestionsMenuOpen(false);

        // right place to store final delta
        // console.log('at editorContainer - quillKeyUpHandler with contents: ', JSON.stringify(props.quillEditor.getContents()));
        // console.log('at editorContainer - quillKeyUpHandler with quill content: ', JSON.stringify(props.quillEditor.getContents().ops[0].insert));
    };

    public static setSuggestionBoxPosition = (props: setSuggestionBoxPositionPropsType) => {
        // console.log('at editor - quillKeyUpHandler with current index: ', selectionIndex);
        // setting suggestion box position
        const boundsOfEditorSelection = props.quillEditor.getBounds(props.selectionIndex, 0);
        // console.log('at editor - quillKeyUpHandler with bounds: ', boundsOfEditorSelection);
        // const quillToolbarElement = document.getElementsByClassName('toolbar');
        // console.log('at editor - quillKeyUpHandler with toolbarPos: ', quillToolbarElement);
        const quillToolBarModule = props.quillEditor.getModule('toolbar');
        // console.log('at editor - quillKeyUpHandler with quillToolBarModule: ', quillToolBarModule);
        const quillToolbarHeight = 66;
        props.setSuggestionDropDownStyle({
            top: boundsOfEditorSelection.top + quillToolbarHeight + 1,
            left: boundsOfEditorSelection.left, // hide div first
            width: '100px',
            height: '100px',
            position: 'absolute'
        });
    };

    public static editorSelectionChangeHandler = (props: editorSelectionChangeHandlerPropsType) => {
        if (props.range) {
            props.setSelectionConfiguration({
                index: props.range.index,
                length: props.range.length
            });
        }
        // console.log('at EditorContainer - editorSelectionChangeHandler with props: ', props.range);
    };

    public static quillKeyUpHandler = async (props: quillKeyHanderPropsType) => {

        const pressedKey = props.event.key;
        // console.log('at editorContainer - quillKeyUpHandler with pressedKey: ', pressedKey);
        const pressedKeyCode = props.event.keyCode;
        const spaceKeyCode = 32;
        const enterKeyCode = 13;
        const tabKeyCode = 9;
        const backSpacekeyCode = 8;
        const dotKeyCode = 190;
        const questionKeyCode = 191;
        const commaKeyCode = 188;
        const semiColonKeyCode = 186;

        const allowedKeyRange = [
            {//numbers
                start: 48,
                end: 57
            },
            {//alphabets
                start: 65,
                end: 90
            },
            {
                start: 190,
                end: 190
            },
            {//numpad
                start: 96,
                end: 105
            }/*,
            {//space
                start: 32,
                end: 32
            }*/
        ];

        let isAllowedkey: boolean = false;

        allowedKeyRange.map((item: any) => {
            if (item.start <= pressedKeyCode && item.end >= pressedKeyCode) {
                isAllowedkey = true;
            }
        });

        var selection = props.quillEditor.getSelection();
        // console.log('at editorContainer - quillKeyUpHandler with currentSelection: ', selection);
        let selectionIndex: number = 0;
        let selectionLength: number = 0;
        if (selection != null) {
            selectionIndex = selection.index;
            selectionLength = selection.length;
        }

        if (pressedKeyCode === spaceKeyCode) {
            // check to avoid load suggestion list once again if user press space key again
            if (selectionIndex - props.suggestionConfiguration.currentIndex != 1) {
                await EditorContainer.setSuggestionsValues({
                    pressedKey: pressedKey,
                    lang: props.lang,
                    setSuggestionConfiguration: props.setSuggestionConfiguration,
                    setSuggestions: props.setSuggestions,
                    suggestionConfiguration: props.suggestionConfiguration,
                    selectionIndex: selectionIndex,
                    quillEditor: props.quillEditor,
                    setSuggestionsMenuOpen: props.setSuggestionsMenuOpen
                });
            }
        }
        // put all keys which need escape without suggestions
        else if (pressedKeyCode == enterKeyCode
            || pressedKeyCode == tabKeyCode
            || pressedKeyCode == dotKeyCode
            || pressedKeyCode == questionKeyCode
            || pressedKeyCode == commaKeyCode
            || pressedKeyCode == semiColonKeyCode) {
            props.setSuggestionConfiguration({
                // startIndex: selectionIndex,
                // currentIndex: selectionIndex,
                text: ''
            });
        }
        else if (pressedKeyCode == backSpacekeyCode) {
            // console.log('at editorContainer - quillKeyUpHandler with current suggestionConfiguration: ', props.suggestionConfiguration, ' , last selectionConfiguration: ', props.selectionConfiguration);

            props.setSuggestionConfiguration({
                // startIndex: props.suggestionConfiguration.startIndex - props.selectionConfiguration.length,
                // currentIndex: props.suggestionConfiguration.currentIndex - props.selectionConfiguration.length,
                text: props.suggestionConfiguration.text.substr(0, props.selectionConfiguration.length)
            });
            // console.log('at editorContainer - quillKeyUpHandler with updated suggestionConfiguration: ', props.suggestionConfiguration);
        }

        if (!isAllowedkey) {
            return;
        }

        EditorContainer.setSuggestionBoxPosition({
            quillEditor: props.quillEditor,
            selectionIndex: selectionIndex,
            setSuggestionDropDownStyle: props.setSuggestionDropDownStyle
        });
    };

    public static loadContent(props: loadContentPropsType): string {
        let sterilizedContent = JSON.stringify(props.content);

        if (!sterilizedContent
            || sterilizedContent.length <= 0) {
            return '';
        }

        // console.log('first character: ', sterilizedContent.substring(0, 1));
        if (sterilizedContent.substring(0, 1) === '"') {
            sterilizedContent = sterilizedContent.substring(1, sterilizedContent.length);
        }

        // console.log('last character: ', sterilizedContent.substring(sterilizedContent.length - 1, sterilizedContent.length));
        if (sterilizedContent.substring(sterilizedContent.length - 1, sterilizedContent.length) === '"') {
            sterilizedContent = sterilizedContent.substring(0, sterilizedContent.length - 1);
        }

        return sterilizedContent;
    };

    private static findCurrentWord(quilleContent: string): string {
        // console.log('at EditorContainer - findCurrentWord with quillContent: ', quilleContent, ' with length: ', quilleContent.length);
        // console.log('at EditorContainer - findCurrentWorkd with last char: ', quilleContent.substring(8, 9));
        if (quilleContent.substring(quilleContent.length - 1, quilleContent.length) == '"') {
            quilleContent = quilleContent.substring(0, quilleContent.length - 1);
        }
        // console.log('at EditorContainer - findCurrentWord with quillContent: ', quilleContent, ' with length: ', quilleContent.length);
        let spaceRemovedvalue = quilleContent.trim();

        spaceRemovedvalue = spaceRemovedvalue.replaceAll("\\n", "");
        spaceRemovedvalue = spaceRemovedvalue.replaceAll("\n", "");
        spaceRemovedvalue = spaceRemovedvalue.replaceAll("\\t", "");
        spaceRemovedvalue = spaceRemovedvalue.replaceAll("\t", "");
        let spaceRemovedValueArray = spaceRemovedvalue.split(' ');

        // console.log('at EditorContainer - findCurrentWord with spaceRemovedValueArray: ', spaceRemovedValueArray);
        // find last valid item
        let result = '';
        let isLoopExitEnabled = false;
        for (let index = spaceRemovedValueArray.length - 1; index >= 0; index--) {
            if (!isLoopExitEnabled) {
                let selectedItem = spaceRemovedValueArray[index];
                selectedItem = selectedItem ? selectedItem.trim() : '';
                // console.log('at EditorContainer - findCurrentWord, loop with selectedItem: ', selectedItem, ' with length: ', selectedItem.length);

                // reject policy
                if (selectedItem.length > 0
                    && (selectedItem == '.'
                        || selectedItem == ','
                        || selectedItem == ';'
                        || selectedItem == ':'
                        || selectedItem == '?'
                        || selectedItem == '!')) {
                    isLoopExitEnabled = true;
                }

                // accept policy
                if (selectedItem.length > 0
                    && selectedItem != '\n'
                    && selectedItem != '\\n'
                    && !isLoopExitEnabled) {
                    result = selectedItem;
                    isLoopExitEnabled = true;
                }
            }
        }

        // // console.log('at EditorContainer - findCurrentWord with spaceRemovedvalue: ', spaceRemovedvalue);
        // // var result = spaceRemovedvalue.length > 1 ? spaceRemovedvalue[spaceRemovedvalue.length - 2] : spaceRemovedvalue[spaceRemovedvalue.length - 1];

        // console.log('at EditorContainer - findCurrentWord with result: ', result);
        return result;
        // return 'ninakko';
    };

    private static async setSuggestionsValues(props: setSuggestionsValuesPropsType) {
        let deltaValue = JSON.stringify(props.quillEditor.getContents().ops[0].insert);
        deltaValue = deltaValue.replace('"', '');
        const suggestionInput = EditorContainer.findCurrentWord(deltaValue);
        // console.log('at editorContainer - setSuggestionsValues with suggestionInput: ', suggestionInput);
        // const newSuggestionInput = props.suggestionConfiguration.text.concat(props.pressedKey);
        // console.log('at EditorContainer - setSuggestionsValues');
        // console.log('at editorContainer - quillKeyUpHandler with allowed input: ', newSuggestionInput);
        // console.log('at editorContainer - quillKeyUpHandler with quill content: ', JSON.stringify(props.quillEditor.getContents().ops[0].insert));

        // dispatch(editorActionCreator.listSuggestions(suggestionConfiguration.text, lang));

        if (suggestionInput.length <= 0) {
            props.setSuggestionConfiguration({
                // startIndex: props.suggestionConfiguration.startIndex,
                // currentIndex: props.selectionIndex,
                text: ''
            });
            return;
        }

        const suggestionsRaw = await EditorContainer.listSuggestions(suggestionInput, props.lang);
        if (suggestionsRaw != null && suggestionsRaw.length > 0) {
            let suggestionsProcessed: any = [];
            suggestionsProcessed.push(
                {
                    label: suggestionInput,
                    value: suggestionInput
                }
            );
            suggestionsRaw.map((item: string) => {
                suggestionsProcessed.push(
                    {
                        label: item,
                        value: item
                    }
                );
            });
            props.setSuggestions(suggestionsProcessed);
        }

        props.setSuggestionConfiguration({
            // startIndex: props.suggestionConfiguration.startIndex,
            // currentIndex: props.selectionIndex,
            text: suggestionInput
        });

        props.setSuggestionsMenuOpen(true);
    };

    public static async listSuggestionsAsync(searchText: string, language: string): Promise<any> {
        return await getTransliterateSuggestions(
            searchText,
            5,
            false,
            language
        );
    }

    public static listSuggestions(searchText: string, language: string): Promise<any> {
        return getTransliterateSuggestions(
            searchText,
            5,
            false,
            language
        );
    }
}