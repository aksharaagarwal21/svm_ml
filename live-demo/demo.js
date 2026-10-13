(() => {
  'use strict';
  const data = window.LiveDemoData;
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const percent = value => `${(value * 100).toFixed(1).replace(/\.0$/, '')}%`;
  const titles = ['Python Code: SVM in Action', 'Is Our SVM Any Good?', 'SVM vs Other Algorithms'];
  const ids = ['live-python', 'live-metrics', 'live-race'];
  const explanations = [
    ['Load', 'Load flower measurements and their species labels.'],
    ['Split', 'Keep exam flowers separate from practice flowers.'],
    ['Scale + train', 'Learn the scales and the boundary from training flowers only.'],
    ['Predict', 'Guess the species of the unseen test flowers.'],
    ['Evaluate', 'Compare the predictions with the real answers.'],
    ['New flower', 'Use four measurements to predict one new species.'],
  ];
  const tips = {
    load_iris: 'Load 150 flowers, each with four measurements and a species label.',
    train_test_split: 'Keep some examples aside for an honest test after training.',
    StandardScaler: 'Put measurements on comparable scales, learned from training data.',
    SVC: 'Create a support vector machine that predicts categories.',
    kernel: 'Choose the kind of boundary: straight, RBF curves, or polynomial curves.',
    C: 'Set how strongly training mistakes are penalised; larger C penalises them more.',
    gamma: 'Control the reach of a training example; scale chooses it from the data.',
    fit: 'Learn from the training examples and their correct answers.',
    predict: 'Use the trained model to guess answers for new examples.',
    accuracy_score: 'Find the fraction of predictions that are correct.',
  };
  const modelInfo = [
    ['Logistic Regression', 'Learns a straight-line score and turns it into probabilities.'],
    ['Decision Tree', 'Learns a series of yes-or-no questions.'],
    ['KNN', 'Looks at the closest known examples.'],
    ['Neural Network', 'Learns layers of transformations.'],
    ['SVM', 'Learns the boundary with the widest margin.'],
  ];
  const notes = [
    "Here's how SVM looks in real Python code, using a famous flower dataset called Iris. We load the flowers, split them into practice questions and exam questions, scale the features so they're comparable, and train an SVM with the RBF kernel. Then we predict flowers it has never seen and check its accuracy. One important detail: the scaling is learned only from the training data, so no test data sneaks into training. That's called preventing data leakage.",
    "How do we know our SVM is any good? If it classifies 90 out of 100 emails correctly, its accuracy is 90%. But accuracy isn't always enough. Precision asks: of the emails we called spam, how many really were spam? Recall asks: of all the real spam, how much did we catch? The F1-score balances the two, and a confusion matrix shows every correct and incorrect answer. When one class is rare, like fraud, precision and recall tell us much more than accuracy alone.",
    "Different algorithms learn in different ways. Logistic regression learns a straight-line score and turns it into probabilities. A decision tree learns a series of yes-or-no questions. KNN looks at the closest known examples. Neural networks learn many layers of transformations. And SVM learns the boundary with the widest margin. No single algorithm is best for every problem.",
  ];
  const runtimeControls = kind => `<div class="ld-runtime"><p class="ld-status" role="status" data-python-status>Loading Python...</p><div class="ld-runtime-actions">
    <button class="btn primary" id="ld-run-${kind}" disabled>${kind === 'iris' ? 'Run Live' : 'Start the Race'}</button>
    <button class="btn ghost" data-saved="${kind}" hidden>Show saved output</button>
    <button class="btn ghost" data-retry hidden>Retry Python</button></div></div>`;
  const stage = $('ld-stage-mount');
  stage.outerHTML = `
    <div class="slide ld-slide" data-slide="live-python">
      <p class="ld-line">Let's train a real SVM on the Iris flower dataset.</p>
      <pre class="code ld-code" id="ld-code" aria-label="Python code, six teaching steps" tabindex="0"></pre>
      <div id="ld-iris-result" hidden aria-live="polite">
        <p class="ld-source" id="ld-iris-source"></p>
        <pre class="code ld-output" id="ld-output" tabindex="0" aria-label="Python output"></pre>
      </div>
    </div>
    <div class="slide ld-slide" data-slide="live-metrics">
      <p class="ld-line">Accuracy isn't the whole story.</p>
      <p class="ld-source" id="ld-matrix-caption"></p>
      <div id="ld-matrix"></div>
      <div class="ld-metrics" id="ld-metrics" aria-live="polite"></div>
    </div>
    <div class="slide ld-slide" data-slide="live-race">
      <p class="ld-line">Same data, different ways of learning.</p>
      <div class="ld-race-grid">${modelInfo.map(([name, description], i) => `<article class="ld-model">
        <h3>${name}</h3><p>${description}</p>
        <div id="ld-plot-${i}" class="ld-plot-placeholder">Ready to learn</div>
      </article>`).join('')}<div class="bnote ld-takeaway">No single algorithm is best for every problem.</div></div>
      <div class="ld-legend"><span><i class="ld-dot"></i>Class 0</span><span><i class="ld-dot red"></i>Class 1</span><span>Dots: test examples · background: model prediction</span></div>
      <p class="ld-source" id="ld-race-source">300 moons · noise 0.25 · fixed seed 42 · 225 training / 75 test examples</p>
    </div>`;
  $('ld-panel-mount').outerHTML = `
    <div class="lvl ld-panel" data-step="live-python">
      <div class="ld-step"><b id="ld-step-label"></b><p id="ld-explanation"></p></div>
      <button class="btn ghost" id="ld-next-step">Next Step</button>
      <div class="ld-controls">
        <label for="ld-kernel">Kernel <select id="ld-kernel"><option value="linear">linear</option><option value="rbf" selected>rbf</option><option value="poly">poly</option></select></label>
        <label for="ld-c">C <input id="ld-c" type="range" min="0.1" max="100" step="0.1" value="1"><output id="ld-c-value" for="ld-c">1.0</output></label>
      </div>
      ${runtimeControls('iris')}
    </div>
    <div class="lvl ld-panel" data-step="live-metrics">
      <div class="ld-controls">
        <button class="btn ghost" id="ld-spam">Spam example</button>
        <button class="btn ghost" id="ld-fraud">Rare Fraud</button>
        <button class="btn primary" id="ld-use-iris">Use our Iris SVM</button>
      </div>
      <p class="bnote" id="ld-cell-help" aria-live="polite">Click a cell to see what it means.</p>
      <p class="bnote ld-fraud" id="ld-fraud-message" hidden>99% accurate, yet it caught zero fraud!</p>
      <p class="ld-source" id="ld-matrix-help">+ / − moves one example between predictions in the same row, keeping the dataset size fixed.</p>
      <p class="ld-source" id="ld-iris-hint" role="status"></p>
    </div>
    <div class="lvl ld-panel" data-step="live-race">
      ${runtimeControls('race')}
      <div class="ld-bars" id="ld-bars" aria-label="Test accuracy, zero to one hundred percent" aria-live="polite"></div>
      <p class="ld-source">Each model learns scaling from the training set only.</p>
    </div>`;

  let codeStep = 0, irisResult = null;
  let worker = null, workerUrl = null, loadTimer = null, slowTimer = null, runTimer = null;
  let runtimeState = 'idle', running = null, message = 'Loading Python...';
  const kernel = () => $('ld-kernel').value;
  const cost = () => Number($('ld-c').value);
  const irisCode = () => data.sources.iris.replace('kernel="rbf", C=1.0', `kernel="${kernel()}", C=${cost().toFixed(1)}`);
  function highlight(code) {
    return code.replace(/#[^\n]*|"[^"\n]*"|'[^'\n]*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[&<>]/g, token => {
      if (token[0] === '#') return `<span class="ld-comment">${escape(token)}</span>`;
      if (/^["']/.test(token)) return `<span class="ld-string">${escape(token)}</span>`;
      if (/^\d/.test(token)) return `<span class="ld-number">${token}</span>`;
      if (/^(from|import)$/.test(token)) return `<span class="ld-keyword">${token}</span>`;
      if (tips[token]) return `<span data-help="${token}" tabindex="0" aria-label="${escape(token + ': ' + tips[token])}">${token}</span>`;
      return escape(token);
    });
  }
  function renderCode(scroll = false) {
    const blocks = irisCode().split(/(?=# [1-6]\. )/);
    $('ld-code').innerHTML = blocks.map((block, i) => `<code class="${i === codeStep + 1 ? 'ld-active' : ''}">${highlight(block)}</code>`).join('');
    $('ld-step-label').textContent = `${codeStep + 1} / 6 · ${explanations[codeStep][0]}`;
    $('ld-explanation').textContent = explanations[codeStep][1];
    $('ld-next-step').textContent = codeStep === 5 ? 'Review Steps' : 'Next Step';
    $('ld-c-value').textContent = cost().toFixed(1);
    if (scroll) {
      const box = $('ld-code'), active = box.querySelector('.ld-active');
      box.scrollTop = active.offsetTop - box.offsetTop - 12;
    }
  }
  function advanceCode() {
    if (codeStep === 5) return false;
    codeStep++; renderCode(true); return true;
  }
  function updateRuntime() {
    document.querySelectorAll('[data-python-status]').forEach(el => { el.textContent = message; });
    ['iris', 'race'].forEach(kind => { $(`ld-run-${kind}`).disabled = runtimeState !== 'ready' || !!running; });
    $('ld-kernel').disabled = $('ld-c').disabled = running === 'iris';
    document.querySelectorAll('[data-saved]').forEach(el => { el.disabled = running === el.dataset.saved; });
    document.querySelectorAll('[data-retry]').forEach(el => { el.hidden = runtimeState !== 'failed'; });
    if (runtimeState === 'failed') showSavedButtons();
  }
  function showSavedButtons() {
    document.querySelectorAll('[data-saved]').forEach(el => { el.hidden = false; });
  }
  function disposeWorker() {
    clearTimeout(loadTimer); clearTimeout(slowTimer); clearTimeout(runTimer);
    if (worker) worker.terminate();
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    worker = null; workerUrl = null;
  }
  function failRuntime(reason) {
    disposeWorker(); running = null; runtimeState = 'failed';
    message = `${reason} Use saved output or retry.`;
    updateRuntime();
  }
  function startPython() {
    if (runtimeState === 'loading' || runtimeState === 'ready') return;
    runtimeState = 'loading'; message = 'Loading Python...'; updateRuntime();
    // A worker keeps the existing presentation responsive while Python trains.
    const workerSource = `
      let py;
      async function initialize() {
        try {
          importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
          py = await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});
          await py.loadPackage('scikit-learn');
          postMessage({type:'ready'});
        } catch (error) { postMessage({type:'load-error', error:String(error)}); }
      }
      onmessage = async ({data}) => {
        if (!py) return;
        const lines = [];
        py.setStdout({batched: text => lines.push(text)});
        const scope = py.toPy({});
        try {
          const result = await py.runPythonAsync(data.code + '\\njson.dumps(_result)', {globals:scope});
          postMessage({type:'result', kind:data.kind, result:{...JSON.parse(result), output:lines.join('\\n')}});
        } catch (error) { postMessage({type:'run-error', error:String(error)}); }
        finally { scope.destroy(); }
      };
      initialize();`;
    try {
      workerUrl = URL.createObjectURL(new Blob([workerSource], {type:'application/javascript'}));
      worker = new Worker(workerUrl);
      worker.onmessage = ({data: event}) => {
        if (event.type === 'ready') {
          clearTimeout(loadTimer); clearTimeout(slowTimer);
          runtimeState = 'ready'; message = 'Python ready'; updateRuntime();
        } else if (event.type === 'load-error') {
          failRuntime('Python could not load.');
        } else if (event.type === 'run-error') {
          clearTimeout(runTimer); running = null;
          message = 'Python could not complete this run. Try again or use saved output.';
          showSavedButtons(); updateRuntime();
        } else if (event.type === 'result') {
          clearTimeout(runTimer); running = null; message = 'Python ready'; updateRuntime();
          if (event.kind === 'iris') showIris(event.result, false);
          else showRace(event.result, false);
        }
      };
      worker.onerror = event => { event.preventDefault(); failRuntime('Python could not load.'); };
      slowTimer = setTimeout(showSavedButtons, 20000);
      loadTimer = setTimeout(() => failRuntime('Python loading timed out.'), 90000);
    } catch (error) { failRuntime('Python is unavailable in this browser.'); }
  }
  function run(kind) {
    if (runtimeState !== 'ready' || running) return;
    running = kind; message = kind === 'iris' ? 'Training the Iris SVM...' : 'Training all five models...';
    updateRuntime();
    runTimer = setTimeout(() => failRuntime('This run timed out.'), 120000);
    worker.postMessage({kind, code: kind === 'iris' ? irisCode() + '\n' + data.sources.irisResult : data.sources.race});
  }
  function showIris(result, saved) {
    irisResult = {...result, saved};
    $('ld-iris-result').hidden = false;
    $('ld-output').textContent = result.output;
    $('ld-iris-source').textContent = `${saved ? 'Saved local run' : 'Live Python run'} · kernel ${result.kernel} · C ${result.C} · scikit-learn ${result.sklearn}`;
    $('ld-iris-hint').textContent = '';
    if (matrixMode === 'iris') renderMatrix();
  }
  function showRace(result, saved) {
    result.models.forEach((model, i) => {
      const plot = $(`ld-plot-${i}`);
      plot.className = '';
      const img = document.createElement('img');
      img.alt = `${model.name} decision boundary; test accuracy ${percent(model.accuracy)}`;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(model.svg);
      plot.replaceChildren(img);
    });
    $('ld-bars').innerHTML = result.models.map(model => `<div><div class="ld-bar-label"><span>${escape(model.name)}</span><span>${percent(model.accuracy)}</span></div><div class="ld-bar-track"><div class="ld-bar-fill" style="width:${model.accuracy * 100}%"></div></div></div>`).join('');
    $('ld-race-source').textContent = `${saved ? 'Saved local run' : 'Live Python run'} · ${result.train_count} train / ${result.test_count} test · noise 0.25 · seed 42`;
  }

  let matrixMode = 'spam', cells = {tp:40, fp:5, fn:5, tn:50}, selectedCell = null;
  const cellNames = {tp:'True Positive', fp:'False Positive', fn:'False Negative', tn:'True Negative'};
  function metric(name, value, formula, undefinedValue = false) {
    return `<div class="ld-metric"><b>${name}</b><strong>${percent(value)}</strong><small>${formula}</small>${undefinedValue ? '<small>No positive predictions; shown as 0.</small>' : ''}</div>`;
  }
  function renderMatrix() {
    const isIris = matrixMode === 'iris';
    const positive = matrixMode === 'fraud' ? 'fraud' : 'spam';
    const negative = matrixMode === 'fraud' ? 'not fraud' : 'not spam';
    $('ld-matrix-help').textContent = isIris ? 'Rows are actual species; columns are predicted species. Precision, recall and F1 are macro averages across all three species.' : '+ / − moves one example between predictions in the same row, keeping the dataset size fixed.';
    $('ld-fraud-message').hidden = matrixMode !== 'fraud' || cells.tp !== 0 || cells.fp !== 0;
    if (isIris) {
      const {matrix, labels, saved, kernel, C} = irisResult;
      let total = 0, correct = 0, precision = 0, recall = 0, f1 = 0;
      matrix.forEach((row, i) => {
        const actual = row.reduce((a,b) => a+b, 0), predicted = matrix.reduce((sum,r) => sum+r[i], 0);
        const p = predicted ? row[i]/predicted : 0, r = actual ? row[i]/actual : 0;
        total += actual; correct += row[i]; precision += p; recall += r; f1 += p+r ? 2*p*r/(p+r) : 0;
      });
      $('ld-matrix-caption').textContent = `${saved ? 'Saved' : 'Live'} Iris SVM · ${total} test flowers · ${kernel}, C ${C}`;
      $('ld-matrix').innerHTML = `<table class="ld-matrix" aria-label="Iris confusion matrix"><thead><tr><th>Actual ↓<br>Predicted →</th>${labels.map(label => `<th scope="col">${escape(label)}</th>`).join('')}</tr></thead><tbody>${matrix.map((row,i) => `<tr><th scope="row">${escape(labels[i])}</th>${row.map((count,j) => `<td class="${i === j ? 'ld-correct' : ''}"><span class="ld-count">${count}</span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
      $('ld-metrics').innerHTML = metric('Accuracy', correct/total, 'Correct / total') + metric('Precision · macro', precision/3, 'Mean of TP / (TP + FP) per species') + metric('Recall · macro', recall/3, 'Mean of TP / (TP + FN) per species') + metric('F1 · macro', f1/3, 'Mean of 2PR / (P + R) per species');
      $('ld-cell-help').textContent = 'The diagonal counts correct species predictions.';
      return;
    }
    const {tp, fp, fn, tn} = cells, total = tp+fp+fn+tn;
    const p = tp+fp ? tp/(tp+fp) : 0, r = tp+fn ? tp/(tp+fn) : 0;
    $('ld-matrix-caption').textContent = `${total} ${matrixMode === 'fraud' ? 'transactions · 10 actual fraud' : 'emails · 45 actual spam'} · positive = ${positive}`;
    const pairs = {tp:'fn', fn:'tp', fp:'tn', tn:'fp'};
    const cell = key => `<td data-cell="${key}" class="${key === 'tp' || key === 'tn' ? 'ld-correct' : ''} ${selectedCell === key ? 'ld-selected' : ''}"><button class="ld-cell-title" data-select="${key}">${cellNames[key]}</button><span class="ld-count">${cells[key]}</span><div class="ld-adjust"><button class="btn ghost" data-adjust="${key}" data-delta="-1" aria-label="Decrease ${cellNames[key]}" ${cells[key] === 0 ? 'disabled' : ''}>−</button><button class="btn ghost" data-adjust="${key}" data-delta="1" aria-label="Increase ${cellNames[key]}" ${cells[pairs[key]] === 0 ? 'disabled' : ''}>+</button></div></td>`;
    $('ld-matrix').innerHTML = `<table class="ld-matrix" aria-label="${positive} confusion matrix"><thead><tr><th>Actual ↓<br>Predicted →</th><th scope="col">${positive}</th><th scope="col">${negative}</th></tr></thead><tbody><tr><th scope="row">${positive}</th>${cell('tp')}${cell('fn')}</tr><tr><th scope="row">${negative}</th>${cell('fp')}${cell('tn')}</tr></tbody></table>`;
    $('ld-metrics').innerHTML = metric('Accuracy', (tp+tn)/total, '(TP + TN) / total') + metric('Precision', p, 'TP / (TP + FP)', tp+fp === 0) + metric('Recall', r, 'TP / (TP + FN)') + metric('F1', p+r ? 2*p*r/(p+r) : 0, '2 × precision × recall / (precision + recall)');
    const help = {tp:`Correctly flagged real ${positive}.`, fp:`Flagged ${positive}, but it was ${negative}.`, fn:`Missed real ${positive} by predicting ${negative}.`, tn:`Correctly recognised ${negative}.`};
    $('ld-cell-help').textContent = selectedCell ? help[selectedCell] : 'Click a cell to see what it means.';
  }

  $('ld-next-step').addEventListener('click', () => { if (!advanceCode()) { codeStep = 0; renderCode(true); } });
  $('ld-kernel').addEventListener('change', () => renderCode());
  $('ld-c').addEventListener('input', () => renderCode());
  ['iris','race'].forEach(kind => { $(`ld-run-${kind}`).addEventListener('click', () => run(kind)); });
  document.querySelectorAll('[data-saved]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.saved === 'iris') {
      if (running === 'iris') return;
      $('ld-kernel').value = 'rbf'; $('ld-c').value = '1'; renderCode();
      showIris(data.saved.iris, true);
    } else if (running !== 'race') showRace(data.saved.race, true);
  }));
  document.querySelectorAll('[data-retry]').forEach(button => button.addEventListener('click', startPython));
  ['spam', 'fraud'].forEach(mode => $(`ld-${mode}`).addEventListener('click', () => {
    matrixMode = mode; selectedCell = null;
    cells = mode === 'spam' ? {tp:40, fp:5, fn:5, tn:50} : {tp:0, fp:0, fn:10, tn:990};
    $('ld-iris-hint').textContent = ''; renderMatrix();
  }));
  $('ld-use-iris').addEventListener('click', () => {
    if (!irisResult) { $('ld-iris-hint').textContent = 'Run the Iris code on the previous screen, or show its saved output first.'; return; }
    matrixMode = 'iris'; renderMatrix();
  });
  $('ld-matrix').addEventListener('click', event => {
    const cell = event.target.closest('[data-cell]');
    if (!cell) return;
    selectedCell = cell.dataset.cell;
    const adjust = event.target.closest('[data-adjust]');
    if (adjust) {
      const key = adjust.dataset.adjust, delta = Number(adjust.dataset.delta), pair = {tp:'fn',fn:'tp',fp:'tn',tn:'fp'}[key];
      if (cells[key]+delta >= 0 && cells[pair]-delta >= 0) { cells[key] += delta; cells[pair] -= delta; }
    }
    renderMatrix();
    // Keep keyboard focus on the equivalent control after updating the matrix.
    if (adjust) $('ld-matrix').querySelector(`[data-adjust="${adjust.dataset.adjust}"][data-delta="${adjust.dataset.delta}"]`)?.focus({preventScroll:true});
  });

  const tooltip = document.createElement('div');
  tooltip.className = 'ld-tooltip'; tooltip.id = 'ld-tooltip'; tooltip.role = 'tooltip'; tooltip.hidden = true;
  document.body.append(tooltip);
  function showTip(event) {
    const token = event.target.closest('[data-help]');
    if (!token) return;
    tooltip.textContent = tips[token.dataset.help]; tooltip.hidden = false;
    token.setAttribute('aria-describedby', 'ld-tooltip');
    const rect = token.getBoundingClientRect();
    tooltip.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - tooltip.offsetWidth - 8)) + 'px';
    tooltip.style.top = Math.max(8, Math.min(rect.bottom + 8, window.innerHeight - tooltip.offsetHeight - 8)) + 'px';
  }
  $('ld-code').addEventListener('mouseover', showTip);
  $('ld-code').addEventListener('focusin', showTip);
  ['mouseout','focusout','scroll'].forEach(type => $('ld-code').addEventListener(type, () => { tooltip.hidden = true; }));
  // Only the added controls consume their native keys; all other keys use the existing navigation.
  document.querySelectorAll('.ld-panel, .ld-slide').forEach(el => el.addEventListener('keydown', event => {
    const nativeControl = event.target.closest('select,input,button');
    if (nativeControl && (event.key === ' ' || event.key === 'Enter' || event.key.startsWith('Arrow') || event.key.startsWith('Page') || event.key === 'Home' || event.key === 'End' || nativeControl.tagName === 'SELECT')) event.stopPropagation();
  }));
  renderCode(); renderMatrix();
  window.LiveDemo = {
    steps: ids.map((id, i) => ({id, ch:4, slide:id, title:titles[i], notes:[notes[i]], ...(i === 0 ? {stepper:advanceCode} : {})})),
    enter(id) { tooltip.hidden = true; if (ids.includes(id) && runtimeState === 'idle') startPython(); },
    reset() { codeStep = 0; renderCode(); },
  };
})();
