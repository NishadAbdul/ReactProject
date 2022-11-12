import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppLayout from './layout/AppLayout';
import Loader from './common/loader/Loader';
import Main from './main/Main';
import Editor from './editor/Editor';

import './App.css';
import EditorOverTextArea from './samples/editor-over-textarea/EditorOverTextArea';

function App() {
  return (
    <Fragment>
      <Router>
        <AppLayout >
          <Suspense fallback={<Loader show={true} fullscreen={true} />}>
            <Switch>
              <Route exact path="/" render={() => <Main />} />
              <Route path="/live" render={() => <Editor />} />
              <Route path="/test/editorovertextarea" render={() => <EditorOverTextArea />} />
            </Switch>
          </Suspense>
        </AppLayout>
      </Router>
    </Fragment>
  );
}

export default App;
