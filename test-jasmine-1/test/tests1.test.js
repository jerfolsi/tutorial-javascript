describe("Hello world", function() {

    //------------------------------------------------------------------------------------
    //-- toContain
    //------------------------------------------------------------------------------------
   it("says world", function() {
        expect(helloWorld()).toContain("world");
    });

    //------------------------------------------------------------------------------------
    //-- toEqual
    //------------------------------------------------------------------------------------
    it("says hello world", function(){
      expect(helloWorld()).toEqual("Hello world!");
    });

    //------------------------------------------------------------------------------------
    //-- toBe(value)
    //------------------------------------------------------------------------------------
    it("and so is a spec", function() {
      var a = true;
      expect(a).toBe(true);
    });

    //------------------------------------------------------------------------------------
    //-- toBeDefined();
    //------------------------------------------------------------------------------------
    it("The 'toBeDefined' matcher compares against `undefined`", function() {
      var a = {
        foo: "foo"
      };
      expect(a.foo).toBeDefined();
      expect(a.bar).not.toBeDefined();
    });

    //-- toBeUndefined()
    it("The `toBeUndefined` matcher compares against `undefined`", function() {
       var a = {
         foo: "foo"
       };
       expect(a.foo).not.toBeUndefined();
       expect(a.bar).toBeUndefined();
    });

    //------------------------------------------------------------------------------------
    //-- toBeNull()
    //------------------------------------------------------------------------------------
    it("The 'toBeNull' matcher compares against null", function() {
      var a = null;
      var foo = "foo";
      expect(null).toBeNull();
      expect(a).toBeNull();
      expect(foo).not.toBeNull();
    });

    //------------------------------------------------------------------------------------
    //-- tobeTruthy()
    //------------------------------------------------------------------------------------
    it("The 'toBeTruthy' / 'toBeFalsy' matcher is for boolean casting testing", function() {
       var a = undefined;
       var b = null;
       var c = "a string";
       var foo = "foo";
       expect(a).not.toBeTruthy();
       expect(a).toBeFalsy();

       expect(b).not.toBeTruthy();
       expect(c).toBeTruthy();
     });

     //------------------------------------------------------------------------------------
     //-- toThrow()
     //------------------------------------------------------------------------------------
     it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
       var foo = function() {
         return 1 + 2;
       };
       var bar = function() {
         return a + 1;
       };
       expect(foo).not.toThrow();
       expect(bar).toThrow();
     });

     //------------------------------------------------------------------------------------
     //-- toThrowError
     //------------------------------------------------------------------------------------
     it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
         var foo = function() {
           throw new TypeError("foo bar baz");
         };

         expect(foo).toThrowError("foo bar baz");
         expect(foo).toThrowError(/bar/);
         expect(foo).toThrowError(TypeError);
         expect(foo).toThrowError(TypeError, "foo bar baz");
     });
});
