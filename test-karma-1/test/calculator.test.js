/*
  Key points of this file:
    -HTML is injected into the browser (in the beforeEach block) for this test fixture.
    -The DOM elements can be accessed in the same way as working in real browser.
*/

describe('Calculator', function() {

    // inject the HTML fixture for the tests
    // The DOM elements can be accessed in the same way as working in real browser.
    beforeEach(function() {
        var fixture = '<div id="fixture"><input id="x" type="text">' +
          '<input id="y" type="text">' +
          '<input id="add" type="button" value="Add Numbers">' +
          'Result: <span id="result" /></div>';

          document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    // call the init function of calculator to register DOM elements
    beforeEach(function() {
        //le javascript agit sur le HTML fixture que nous avont injecté
        window.calculator.init();
    });

    // run a test 3 = 1 + 2
    it('should return 3 for 1 + 2', function() {
       document.getElementById('x').value = 1;
       document.getElementById('y').value = 2;
       document.getElementById('add').click();
       expect(document.getElementById('result').innerHTML).toBe('3');
    });

    // run a test 0 = hello + 2
    it('should calculate zero for invalid x value', function() {
        document.getElementById('x').value = 'hello';
        document.getElementById('y').value = 2;
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('0');
    });

    // run a test 0 = 1 + 'goodbye'
    it('should calculate zero for invalid y value', function() {
        document.getElementById('x').value = 1;
        document.getElementById('y').value = 'goodbye';
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('0');
    });

});
