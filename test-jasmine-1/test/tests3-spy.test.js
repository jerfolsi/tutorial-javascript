//----------------------------------------------------------
//----------------------------------------------------------
// spyOn(object, method)
// exepct(object.method).toHaveBeenCalledWith(arg1, arg2);
//
// - Jasmine has test double functions called spies. A spy can stub any function
//   and tracks calls to it and all arguments.
// - A spy only exists in the describe or it block in which it is defined,
//   and will be removed after each spec.
//----------------------------------------------------------
//----------------------------------------------------------
describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  //-- carefull : the setBar method is stub because of the spyOn
  it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
});


//----------------------------------------------------------
//----------------------------------------------------------
//  spyOn().and.callThrough
//
//  By chaining the spy with and.callThrough, the spy will still track all calls to it
//  but in addition it will delegate to the actual implementation.
//----------------------------------------------------------
//----------------------------------------------------------

describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, 'getBar').and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other functions", function() {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(123);
  });
});


//----------------------------------------------------------
//----------------------------------------------------------
// spies.and.returnValue
// spyOn(object, method).and.returnValue(value);
//
// By chaining the spy with and.returnValue,
// all calls to the function will return a specific value.
//----------------------------------------------------------
//----------------------------------------------------------
describe("A spy, when configured to fake a return value", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };
    //mock the getBar method > it will return 745
    spyOn(foo, "getBar").and.returnValue(745);
    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other functions", function() {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(745);
  });
});

//----------------------------------------------------------
//----------------------------------------------------------
// spies.and.callFake
// spyOn(object, method).and.callFake
//
// By chaining the spy with and.callFake, all calls to the spy
// will delegate to the supplied function.
//----------------------------------------------------------
//----------------------------------------------------------
describe("A spy, when configured with an alternate implementation", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.callFake(function() {
      return 1001;
    });

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other functions", function() {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(1001);
  });
});


//----------------------------------------------------------
//----------------------------------------------------------
// Spies: and.stub
// spyOn(object, method).and.callFake
//----------------------------------------------------------
//----------------------------------------------------------

describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar').and.callThrough();
  });

  it("can call through and then stub in the same spec", function() {
    //setBar method is normally executed (its body is as original)
    foo.setBar(123);
    expect(bar).toEqual(123);

    //setBar method's body is erased
    foo.setBar.and.stub();
    bar = null;

    //we we call setBar, nothing happens
    foo.setBar(123);
    expect(bar).toBe(null);
  });
});


//----------------------------------------------------------
//----------------------------------------------------------
//
//----------------------------------------------------------
//----------------------------------------------------------

describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };
    spyOn(foo, 'setBar');
  });

  //-- calls.any()
  it("tracks if it was called at all", function() {
     expect(foo.setBar.calls.any()).toEqual(false);
     foo.setBar();
     expect(foo.setBar.calls.any()).toEqual(true);
   });

   //-- calls.count()
   it("tracks the number of times it was called", function() {
      expect(foo.setBar.calls.count()).toEqual(0);
      foo.setBar();
      foo.setBar();
      expect(foo.setBar.calls.count()).toEqual(2);
    });

    //-- calls.argsFor(x)
    it("tracks the arguments of each call", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");

      expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
      expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    });

    //-- calls.allArgs()
    it("tracks the arguments of all calls", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");

      expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
    });
});


//----------------------------------------------------------
//----------------------------------------------------------
// Spies: createSpy
//
// When there is not a function to spy on, jasmine.createSpy can create a “bare” spy.
// This spy acts as any other spy – tracking calls, arguments, etc.
// But there is no implementation behind it. Spies are JavaScript objects and can be used as such.
//
//----------------------------------------------------------
//----------------------------------------------------------

describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };
    spyOn(foo, 'setBar');
  });

  it("tracks the context", function() {
    //create a "bare" spy with no internal implementation
    var spy = jasmine.createSpy('spy');
    var baz = {
      fn: spy
    };
    var quux = {
      fn: spy
    };
    baz.fn(123);
    quux.fn(456);

    expect(spy.calls.first().object).toBe(baz);
    expect(spy.calls.mostRecent().object).toBe(quux);
  });
});
