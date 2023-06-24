const findIndex = (expressionSortedList, expression) => {
  var left = 0;
  var right = expressionSortedList.length - 1;
  console.log([200, expression]);
  
  while (true) {
    middle = Math.floor((left + right) / 2);
    // console.log([201, [left, right, middle]])
    if (literallyEquals(expressionSortedList[middle], expression)){
      // console.log(202);
      return [middle, true];
    } else if (literallyEquals(expressionSortedList[right], expression)) {
      // console.log(202.5);
      return [right, true];
    } else if (lt(expressionSortedList[middle], expression)){
      // console.log(203);
      if (middle <= left) {
        // console.log(204);
        return [left, false];
      }
      left = middle + 1;
    } else {
      // console.log(205);
      if (right <= middle) {
        // console.log(206);
        return [right, false];
      }
      right = middle - 1;
    }
  }
};

const updateTable = (checkStandard = false) => {
  $('#result').removeClass('error');
  $('#result').text('');
  
  const rawInput = $('#inputted-json').text();

  let expression = {};
  let errorFlag = false;
  if (rawInput) {
    // sanitize input
    // change all the spaces and line breaks into a single space
    const rawInputSpacesReplaced = rawInput.replace(/\s+/g, ' ').trim();
    console.log(rawInputSpacesReplaced);
    if (/[.\/]/.test(rawInputSpacesReplaced)) {
      $('#result').addClass('error');
      $('#result').text('Did you try to hack this page?');
      return;
    }

    // passes only necessary letters
    if (!/^[0Okxm{}\[\],": ]+$/.test(rawInputSpacesReplaced)) {
      $('#result').addClass('error');
      $('#result').text('Invalid characters detected');
      return;
    }

    // add quotations before semicolon if there is not
    const rawInputQuotationMessed = rawInputSpacesReplaced.replaceAll(/([^"]):/g, '"$1":');

    // loads JSON
    try {
      expression = JSON.parse(rawInputQuotationMessed);
      if (standard(expression)) {
        console.log([-1, expression]);
        $('#result').text('It is standard');
      } else {
        $('#result').text('It is NOT standard');
      }
      console.log(expression);
    } catch (error) {
      errorFlag = true;
      $('#result').addClass('error');
      $('#result').text('JSON format error');
    }
  }

  const maxms = parseInt($('#selected-maxms').text());
  const sortedExpressions = nsLeqSortedEnumerate(maxms);
  let insertingPosition = 0;
  let inTable = true;
  let insertedSortedExpressions = sortedExpressions.map((expression, index) => [index, expression]);
  if (rawInput && !errorFlag) {
    [insertingPosition, inTable] = findIndex(sortedExpressions, expression);
    console.log(insertingPosition, inTable);
    // I assume sortedExpressions[0] is always 0 so inserting to the leftmost never happens
    if (!inTable) {
      const formattedSortedExpressions = sortedExpressions.map((expression, index) => [index, expression]);
      insertedSortedExpressions =
      formattedSortedExpressions
        .slice(0, insertingPosition + 1)
        .concat([['', expression]])
        .concat(formattedSortedExpressions.slice(insertingPosition + 1));
    }
  }
  console.log(sortedExpressions);
  console.log(insertedSortedExpressions);
  const tableRows = insertedSortedExpressions.map((pair) => {
    const index = pair[0];
    const expression = pair[1];
    const presetEntry = presets.find(entry => literallyEquals(entry.expression, expression));
    const presetName = (presetEntry === undefined ? '' : presetEntry.name);
    const trClass = (
      (rawInput && !errorFlag) ? (
        index === '' ? 'yellow' : (
          inTable && (insertingPosition == index) ? 'yellow' : ''
        )
      ) : ''
    );
    return `<tr class=${trClass}><td>${index}</td><td>${presetName}</td><td>${JSON.stringify(expression)}</td></tr>`;
  });
  const addingRowsHtml = tableRows.join('\n');
  $('#table-main tbody tr').remove();
  $('#table-main tbody')[0].insertAdjacentHTML('beforeend', addingRowsHtml);
};

const updateButtons = maxms => {
  $('.maxms-button').prop('disabled', false);
  $(`#maxms-${maxms}`).prop('disabled', true);
}

const generatePreset = currentPresets => {
  $('#preset option').remove();
  const emptyHtmlText = '<option value="none">Select preset...</option>';
  $('#preset')[0].insertAdjacentHTML('beforeend', emptyHtmlText);

  currentPresets.forEach(preset => {
    const presetHtmlText = `<option value="${preset.name}">${preset.name}</preset>`;
    $('#preset')[0].insertAdjacentHTML('beforeend', presetHtmlText);
  })

}

$(document).ready(() => {
  // generates max M(s) buttons
  for(let i = 1; i <= 7; i++) {
    const buttonHtmlText = `<input type="button" class="maxms-button" id="maxms-${i}" value=${i}>`;
    $('#button-area')[0].insertAdjacentHTML('beforeend', buttonHtmlText);
  }

  console.log(presets);
  // generates preset
  generatePreset(presets);

  // set max M(s) button behavior
  $('.maxms-button').on('click', e => {
    const maxms = e.target.value;
    $('#selected-maxms').text(maxms);
    updateButtons(maxms);
    updateTable();
    console.log(expressionCacheNew);
  });

  // set "Check standardness and compare" behavior
  $('#set-json').on('click', () => {
    const rawInput = $('#input-json')[0].value;
    $('#inputted-json').text(rawInput);
    updateTable(true);
  });

  // set preset behavior
  $('#preset').on('change', e => {
    const presetEntry = presets.find(entry => entry.name === e.target.value);
    if (presetEntry !== undefined) {
      const expression = presets.find(entry => entry.name === e.target.value).expression;
      $('#input-json').val(JSON.stringify(expression));
    }
  })

  $('#use-touhoukyodaisuu-version').prop('checked', false);
  // set checkbox behavior
  $('#use-touhoukyodaisuu-version').on('change', e => {
    console.log($(e.target).prop('checked'));
    useTouhoukyodaisuuVersion = $(e.target).prop('checked');
    if (useTouhoukyodaisuuVersion) {
      presets = presetsTouhou;
    } else {
      presets = presetsNew;
    }
    generatePreset(presets);
  })

  // click 1
  $('#maxms-1').click();
});