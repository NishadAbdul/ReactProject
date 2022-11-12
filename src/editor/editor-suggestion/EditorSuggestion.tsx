// ref: https://julietonyekaoha.medium.com/customizing-reusable-react-select-menu-options-components-7642190caa73

import React, { Fragment } from 'react';
import Select, { ActionMeta, components, GroupTypeBase } from "react-select";
// import Select from 'react-select/src/Select';

type EditorSuggestionParameter = {
    options: readonly ({ label: string; value: string; } | GroupTypeBase<{ label: string; value: string; }>)[] | undefined,
    suggestionIsMenuOpen: boolean | undefined,
    suggestionListRef: any | undefined,
    onChange: (((value: { label: string; value: string; } | GroupTypeBase<{ label: string; value: string; }> | null, actionMeta: ActionMeta<{ label: string; value: string; } | GroupTypeBase<{ label: string; value: string; }>>) => void) & ((value: { label: string; value: string; } | GroupTypeBase<{ label: string; value: string; }> | null, action: ActionMeta<{ label: string; value: string; } | GroupTypeBase<{ label: string; value: string; }>>) => void)) | undefined
};

function EditorSuggestion(parameters: EditorSuggestionParameter) {
    return (
        <div>
            {/* <Select
                options={options}
                components={{ Menu, Option }}
                changeOptionsData={changeOptionsData}
            /> */}
            <Select
                menuIsOpen={parameters.suggestionIsMenuOpen}
                ref={parameters.suggestionListRef}
                options={parameters.options}
                onChange={parameters.onChange}
                menuPortalTarget={document.getElementById('editor-quill')}
                components={{ Menu, Option }}
            />
        </div>
    );
};

const Menu = (props: any) => {
    return (
        <Fragment>
            <components.Menu {...props}>
                <div>
                    {props.selectProps.fetchingData ? (
                        <span className="fetching">Fetching data...</span>
                    ) : (
                        <div className="you-can-remove">{props.children}</div>
                    )}
                    {/* <button
                        className={"change-data"}
                        onClick={props.selectProps.changeOptionsData}
                    >
                        Change data
                    </button> */}
                </div>
            </components.Menu>
        </Fragment>
    );
};

const Option = (props: any) => {
    return (
        <Fragment>
            <components.Option {...props}>{props.children}</components.Option>
        </Fragment>
    );
};

export default EditorSuggestion;