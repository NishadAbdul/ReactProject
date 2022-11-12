import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Quill from 'quill';
import Select from 'react-select';

import IWorksheet from './types/IWorksheet';
import './Editor.scss';
import { Language, ReactTransliterate } from 'react-transliterate';
import { Actions, editorActionCreator } from './state/editorActions';
import { Console } from 'console';
import { EditorContainer } from './EditorContainer';
import StateManager from 'react-select';

function Editor() {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [selectionConfiguration, setSelectionConfiguration] = useState({
        index: 0,
        length: 0
    });
    const [suggestionConfiguration, setSuggestionConfiguration] = useState({
        // startIndex: 0,
        // currentIndex: 0,
        text: ''
    });
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsMenuOpen, setSuggestionsMenuOpen] = useState(false);
    const [lang, setLang] = useState<Language>("ml");
    const [suggestionDropDownOpen, setSuggestionDropDownOpen] = useState(true);
    // const [firstTimeWorksheetLoading, setfirstTimeWorksheetLoading] = useState(true);
    // const [suggestionDropDownStyle, setSuggestionDropDownStyle] = useState({
    //     placedDiv:{
    //         top:'-9999px',
    //         left:'-9999px', // hide div first
    //         width:'100px',
    //         height:'100px',
    //         position:'absolute'
    //     }
    // });
    const [suggestionDropDownStyle, setSuggestionDropDownStyle] = useState<React.CSSProperties>({
        top: '-9999px',
        left: '-9999px', // hide div first
        width: '100px',
        height: '100px',
        position: 'absolute'
    });

    const activeWorksheet: IWorksheet = useSelector<any, any>((state) => state.editor.activeWorksheet);
    const [quillEditorState, setQuillEditorState] = useState<Quill>();

    // const suggestionListRef = React.createRef<StateManager>();
    const suggestionListRef = React.createRef<StateManager>();

    let quillEditor: Quill;

    useEffect(() => {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ];

        const quillOptions = {
            debug: "warn",
            modules: {
                toolbar: toolbarOptions,
            },
            placeHolder: "Add your content here",
            readOnly: false,
            theme: "snow"
        };

        if (!quillEditorState) {
            quillEditor = new Quill("#editor-quill", quillOptions);
            setQuillEditorState(quillEditor);

            // console.log('at Editor - useEffect with activeWorksheet content: ', JSON.stringify(activeWorksheet.content));
        }
        else {
            quillEditor = quillEditorState;
        }

        // if (firstTimeWorksheetLoading
        //     && activeWorksheet.content){
        //     quillEditor.setContents(activeWorksheet.content);
        //     setfirstTimeWorksheetLoading(false);
        // }

        quillEditor.focus();

        // quillEditor.on('text-change', (delta, oldContents, source) => quillTextChangeHandler({
        //     oldContents: oldContents,
        //     delta: delta,
        //     quillEditor: quillEditor
        // }));
        quillEditor.on('selection-change', (range, source) => {
            // console.log('at Editor - onSelection-Change of quilllEditor with range: ', range, ' and source: ', source);
            EditorContainer.editorSelectionChangeHandler({
                range: range,
                setSelectionConfiguration: setSelectionConfiguration
            });
        });

        if (suggestionsMenuOpen) {
            suggestionListRef.current?.focus();
        }

        // console.log('at Editor - useEffect with activeWorksheet.content: ', JSON.stringify(activeWorksheet.content));
    });

    return (
        <div className="body-structure">
            <div className="body-structure-left-menu">Left menu | Actions</div>
            <div className="body-structure-main">
                <div>
                    {
                        suggestionDropDownOpen && suggestionsMenuOpen ? (
                            <Select
                                style={suggestionDropDownStyle}
                                menuIsOpen={suggestionsMenuOpen}
                                ref={suggestionListRef}
                                options={suggestions}
                                onChange={(eve) => EditorContainer.suggestionChangeHandler({
                                    event: eve,
                                    quillEditor: quillEditor,
                                    setSuggestionConfiguration: setSuggestionConfiguration,
                                    setSuggestionsMenuOpen: setSuggestionsMenuOpen,
                                    suggestionConfiguration: suggestionConfiguration
                                })}
                                menuPortalTarget={document.getElementById('editor-quill')}
                                controlShouldRenderValue={false} />
                        ) : <div className="body-structure-main-placeholder"></div>
                    }
                </div>
                <div id="toolbar" />
                {activeWorksheet != null ?
                    (
                        <div>
                            <div
                                tabIndex={-1}
                                id="editor-quill"
                                className="editor-quill"
                                onKeyUp={(eve) => EditorContainer.quillKeyUpHandler({
                                    event: eve,
                                    lang: lang,
                                    quillEditor: quillEditor,
                                    setSuggestionConfiguration: setSuggestionConfiguration,
                                    setSuggestions: setSuggestions,
                                    setSuggestionsMenuOpen: setSuggestionsMenuOpen,
                                    suggestionConfiguration: suggestionConfiguration,
                                    setSuggestionDropDownStyle: setSuggestionDropDownStyle,
                                    selectionConfiguration: selectionConfiguration
                                })}
                                // onMouseUp={(eve) => setSuggestionsMenuOpen(false)}
                            >{/*EditorContainer.loadContent({
                                content: activeWorksheet.content,
                                setSuggestionConfiguration: setSuggestionConfiguration
                            })*/}
                            </div>
                        </div>
                    ) : ''}
                {/* <div id="editorHtmlDisplay"></div> */}
                <div>
                    <button id="btnLoad" onClick={(eve) => {
                        // console.log('at btnLoad - onClick with activeWorksheet: ', activeWorksheet);
                        quillEditor.setContents(activeWorksheet.content)
                    }} >Load</button>
                    <button id="btnSubmit" onClick={(eve) =>
                        dispatch(editorActionCreator.saveCurrentWorksheet({
                            activeWorksheetId: activeWorksheet.id,
                            name: 'test 1',
                            category: 'film',
                            type: 'screenplay',
                            content: quillEditor.getContents()
                        }))
                    } >Submit</button>
                </div>
            </div>
            <div className="body-structure-right-menu">
                <div className="body-structure-right-menu-item">Comments</div>
                <div className="body-structure-right-menu-item"> | </div>
                <div className="body-structure-right-menu-item">Chat</div>
            </div>

        </div>
    );
};

// const getCurrentWorksheetSaveInput = {
//     return {
//         name: 'test 1',
//         category: 'film',
//         type: 'screenplay',
//         content: 'test content'
//     }
// };

export default Editor;