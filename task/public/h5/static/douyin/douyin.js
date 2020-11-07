(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.DouyinOpenJSBridge = {}));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator, PromiseImpl) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	            return PromiseImpl.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return PromiseImpl.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	      if (PromiseImpl === void 0) PromiseImpl = Promise;
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function stop() {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports );

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	/*!
	* @bridge/bytedance v1.0.0-alpha.18
	* (c) 2020 
	*/

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	/* global Reflect, Promise */
	var _extendStatics = function extendStatics(d, b) {
	  _extendStatics = Object.setPrototypeOf || {
	    __proto__: []
	  } instanceof Array && function (d, b) {
	    d.__proto__ = b;
	  } || function (d, b) {
	    for (var p in b) {
	      if (b.hasOwnProperty(p)) d[p] = b[p];
	    }
	  };

	  return _extendStatics(d, b);
	};

	function __extends(d, b) {
	  _extendStatics(d, b);

	  function __() {
	    this.constructor = d;
	  }

	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	/*!
	* @bridge/base v1.0.0-alpha.10
	* (c) 2020 
	*/


	var version = "1.0.0-alpha.10";
	/**
	 * 绫诲瀷锛氬嚱鏁拌皟鐢ㄩ敊璇爜
	 */

	var ErrorCode;

	(function (ErrorCode) {
	  ErrorCode[ErrorCode["Failure"] = 0] = "Failure";
	  ErrorCode[ErrorCode["Success"] = 1] = "Success";
	  ErrorCode[ErrorCode["Unauthorized"] = -1] = "Unauthorized";
	  ErrorCode[ErrorCode["NotExist"] = -2] = "NotExist"; // 鎺ュ彛涓嶅瓨鍦�
	})(ErrorCode || (ErrorCode = {}));
	/**
	 * 鍙戦€佹柟娉曡皟鐢ㄦ秷鎭殑iframe id
	 */


	var DISPATCH_MESSAGE_IFRAME_ID = '__JSBridgeIframe__';
	/**
	 * 鍙戦€佹柟娉曡皟鐢ㄩ槦鍒楃殑iframe id
	 */

	var SET_RESULT_IFRAME_ID = '__JSBridgeIframe_SetResult__';
	/**
	 * 鍥炶皟鍑芥暟ID璁℃暟璧风偣
	 */

	var CALLBACK_ID_START = 1023;
	/**
	 * 榛樿鐨凧SSDK鐗堟湰鍙�
	 */

	var DEFAULT_VERSION = version;
	/**
	 * iframe璋冪敤鐨勯粯璁cheme
	 */

	var DEFAULT_SCHEME = 'nativeapp://';
	/**
	 * iframe璋冪敤鐨勯粯璁ゆ秷鎭彂閫佽矾寰�
	 */

	var DEFAULT_DISPATCH_MESSAGE_PATH = 'dispatch_message/';
	/**
	 * iframe璋冪敤鐨勯粯璁ょ粨鏋滃彂閫佽矾寰�
	 */

	var DEFAULT_SET_RESULT_PATH = 'private/setresult/SCENE_FETCHQUEUE';

	var JSBridge =
	/** @class */
	function () {
	  function JSBridge(options) {
	    this.version = options.version || DEFAULT_VERSION;
	    this.nativeMethodInvoker = options.nativeMethodInvoker;
	    this.nativeEventListener = options.nativeEventListener;
	    this.scheme = options.scheme || DEFAULT_SCHEME;
	    this.dispatchMessagePath = options.dispatchMessagePath || DEFAULT_DISPATCH_MESSAGE_PATH;
	    this.setResultPath = options.setResultPath || DEFAULT_SET_RESULT_PATH;
	    this.listenNativeEvent = options.listenNativeEvent === true ? true : false;
	    this.callbackId = CALLBACK_ID_START;
	    this.callbackMap = {};
	    this.eventMap = {};
	    this.javascriptMessageQueue = []; // tslint:disable-next-line

	    typeof window !== 'undefined' && this.tryCreateIFrames();
	  }
	  /**
	   * 璋冪敤瀹㈡埛绔柟娉�
	   *
	   * @param func - 鍑芥暟鍚嶇О
	   * @param params - 鍙傛暟
	   * @param callback - 鍥炶皟鍑芥暟
	   * @param sdkVersion - JSSDK鐗堟湰鍙�
	   */


	  JSBridge.prototype.call = function (func, params, callback, options) {
	    if (options === void 0) {
	      options = this.version;
	    }

	    var sdkVersion = this.version;
	    var namespace;

	    if (!func || typeof func !== 'string') {
	      return;
	    }

	    if (typeof params !== 'object') {
	      params = {};
	    }

	    if (typeof options === 'string') {
	      sdkVersion = options || this.version;
	    } else if (typeof options === 'object') {
	      namespace = options.namespace;
	      sdkVersion = options.sdkVersion || this.version;
	    }

	    var message = {
	      func: func,
	      params: params,
	      // @ts-ignore
	      JSSDK: sdkVersion,
	      __msg_type: 'call',
	      namespace: namespace
	    };

	    if (typeof callback === 'function') {
	      var callbackId = this.registerCallback(callback);
	      message.__callback_id = callbackId;
	    }

	    if (window.parent !== window) {
	      // 璇存槑sdk鏄湪iframe鍐呴儴琚紩鐢�
	      // 瀹㈡埛绔晶鍙€氳繃杩欎釜灞炴€у垽鏂槸鍚﹀湪iframe鍐呴儴浣跨敤jsb锛屼粠鑰屽仛鐩稿簲鐨勫鐞�
	      // 鑳屾櫙瑙侊細https://bytedance.feishu.cn/docs/doccnytoP4lXehQWqvQGsQdZMsb
	      message.__iframe_url = window.location.href;
	    }

	    this.sendMessageToNative(message);
	  };
	  /**
	   * 娉ㄥ唽浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callback - 鍥炶皟鍑芥暟
	   * @return - 鍥炶皟ID
	   */


	  JSBridge.prototype.on = function (event, callback, once) {
	    if (once === void 0) {
	      once = false;
	    }

	    if (!event || typeof event !== 'string' || typeof callback !== 'function') {
	      return;
	    }

	    var callbackId = this.registerCallback(callback);
	    this.eventMap[event] = this.eventMap[event] || {};
	    this.eventMap[event][callbackId] = {
	      once: once
	    }; // 鍏煎鏃х増SDK

	    if (this.listenNativeEvent) {
	      if (this.nativeEventListener) {
	        this.nativeEventListener(event);
	      } else {
	        var eventMessage = {
	          func: event,
	          params: {},
	          JSSDK: this.version,
	          __msg_type: 'event',
	          __callback_id: event
	        };
	        this.sendMessageToNative(eventMessage);
	      }
	    }

	    return callbackId;
	  };
	  /**
	   * 娉ㄥ唽鍗曟浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callback - 鍥炶皟鍑芥暟
	   * @return - 鍥炶皟ID
	   */


	  JSBridge.prototype.once = function (event, callback) {
	    return this.on(event, callback, true);
	  };
	  /**
	   * 娉ㄩ攢浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callbackId - 鍥炶皟ID
	   * @return - 娉ㄩ攢缁撴灉
	   */


	  JSBridge.prototype.off = function (event, callbackId) {
	    if (!event || typeof event !== 'string') {
	      return true;
	    }

	    var callbackMetaMap = this.eventMap[event];

	    if (!callbackMetaMap || typeof callbackMetaMap !== 'object' || !callbackMetaMap.hasOwnProperty(callbackId)) {
	      return true;
	    }

	    this.deregisterCallback(callbackId);
	    delete callbackMetaMap[callbackId];
	    return true;
	  };
	  /**
	   * 妯℃嫙瀹㈡埛绔Е鍙戜簨浠�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param params - 浜嬩欢鍙傛暟
	   */


	  JSBridge.prototype.trigger = function (event, params) {
	    return this.handleMessageFromNative({
	      __msg_type: 'event',
	      __params: params,
	      __event_id: event
	    });
	  };
	  /**
	   * 澶勭悊瀹㈡埛绔彂閫佽繃鏉ョ殑娑堟伅
	   *
	   * @param message - 瀹㈡埛绔秷鎭�
	   */


	  JSBridge.prototype.handleMessageFromNative = function (message) {
	    var _this = this;

	    var params = message.__params;
	    var callbackId = String(message.__callback_id); // 鍏煎鑰佺増鏈€昏緫锛岄粯璁よ缃负''(澶勭悊undefined鐨勬儏鍐�)

	    var event = String(message.__event_id || '');
	    var messageType = message.__msg_type; // 鏌愪簺app浜嬩欢娑堟伅杩斿洖鐨刜_msg_type涔熸槸callback锛屾墍浠ヤ笉瑕佷緷璧朹_msg_type鏉ュ垽鏂槸浠€涔堢被鍨�

	    if (this.callbackMap[callbackId]) {
	      messageType = 'callback';
	    } else if (this.eventMap[callbackId]) {
	      messageType = 'event'; // 鍏煎瑗跨摐 鍙繑鍥� __callback_id

	      event = event || callbackId;
	    }

	    var ret = {
	      __err_code: 'cb404'
	    };

	    switch (messageType) {
	      case 'callback':
	        var callback = this.callbackMap[callbackId];

	        if (typeof callback === 'function') {
	          ret = callback(params);
	        }

	        this.deregisterCallback(callbackId);
	        break;

	      case 'event':
	        var callbackMetaMap_1 = this.eventMap[event];

	        if (callbackMetaMap_1 && typeof callbackMetaMap_1 === 'object') {
	          Object.keys(callbackMetaMap_1).forEach(function (callbackId) {
	            var callback = _this.callbackMap[callbackId];
	            var callbackMeta = callbackMetaMap_1[callbackId];

	            if (typeof callback === 'function') {
	              ret = callback(params);
	            }

	            if (callbackMeta && callbackMeta.once) {
	              _this.deregisterCallback(callbackId);

	              delete callbackMetaMap_1[callbackId];
	            }
	          });
	        }

	        break;
	    }
	    /**
	     * 鍦ㄦ煇浜涘満鏅笅锛屽鎴风鏍规嵁杩斿洖鍊兼潵鍒ゆ柇
	     * 瀹㈡埛绔殑娑堟伅鏄惁鎴愬姛鍙戦€佸埌H5绔�
	     */


	    return ret;
	  };
	  /**
	   * 鎷夊彇JavaScript娑堟伅闃熷垪
	   */


	  JSBridge.prototype.fetchJavaScriptMessageQueue = function () {
	    var json = JSON.stringify(this.javascriptMessageQueue); // 娓呯┖javascript娑堟伅闃熷垪

	    this.javascriptMessageQueue.splice(0, this.javascriptMessageQueue.length);
	    /**
	     * android 4.4浠ヤ笅鐗堟湰瀹㈡埛绔€氳繃result iframe鑾峰彇娑堟伅闃熷垪鍐呭
	     *
	     * 涓轰粈涔坆ase64缂栫爜鍓嶉渶瑕佹墽琛宍unescape(encodeURIComponent(json))`锛�
	     * 璇︽儏鍙傝€冿細https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa#Unicode_%E5%AD%97%E7%AC%A6%E4%B8%B2
	     */

	    var base64 = btoa(unescape(encodeURIComponent(json)));

	    if (this.setResultIFrame) {
	      this.setResultIFrame.src = "" + this.scheme + this.setResultPath + "&" + base64;
	    }
	    /**
	     * ios浠ュ強android 4.4浠ヤ笂鐗堟湰瀹㈡埛绔�
	     * 鐩存帴閫氳繃鍑芥暟杩斿洖鍊艰幏鍙栨秷鎭槦鍒楀唴瀹�
	     */


	    return json;
	  };
	  /**
	   * 鍙戦€佹秷鎭埌瀹㈡埛绔�
	   *
	   * @param message JavaScript绔殑娑堟伅缁撴瀯
	   */


	  JSBridge.prototype.sendMessageToNative = function (message) {
	    /**
	     * 鍦ㄧ紪鍐欐敞鍏ュ紡璋冪敤鍜宨frame寮忚皟鐢ㄧ殑鎬ц兘瀵规瘮娴嬭瘯鏃讹紝闇€瑕佹彁渚涗竴涓満鍒�
	     * 涓诲姩瑙﹀彂iframe寮忚皟鐢紝鍥犳杩欓噷澧炲姞浜嗕竴涓垽鏂潯浠秏essage.JSSDK锛�
	     * 璋冪敤鏂规硶鏃秙dkVersion浼犲叆绌哄瓧绗︿覆鍗冲彲瑙﹀彂iframe璋冪敤銆�
	     */
	    if (message.JSSDK && this.nativeMethodInvoker) {
	      var nativeMessageJSON = this.nativeMethodInvoker(message);
	      /**
	       * 濡傛灉璇ユ柟娉曟湁杩斿洖锛岃鏄庡鎴风閲囩敤浜嗗悓姝ヨ皟鐢ㄦ柟寮�
	       */

	      if (nativeMessageJSON) {
	        var nativeMessage = JSON.parse(nativeMessageJSON);
	        this.handleMessageFromNative(nativeMessage);
	      }
	    } else {
	      // 濡傛灉娌℃湁妫€娴嬪埌娉ㄥ叆鐨勫叏灞€API锛屽垯fallback鍒癷frame鍙戣捣璋冪敤鐨勬柟寮�
	      this.javascriptMessageQueue.push(message);

	      if (!this.dispatchMessageIFrame) {
	        this.tryCreateIFrames();
	        return;
	      }

	      this.dispatchMessageIFrame.src = "" + this.scheme + this.dispatchMessagePath;
	    }
	  };
	  /**
	   * 娉ㄥ唽鍥炶皟鍑芥暟
	   *
	   * @param callback - 鍥炶皟鍑芥暟
	   * @return - 鍥炶皟ID
	   */


	  JSBridge.prototype.registerCallback = function (callback) {
	    var callbackId = String(this.callbackId++);
	    this.callbackMap[callbackId] = callback;
	    return callbackId;
	  };
	  /**
	   * 娉ㄩ攢鍥炶皟鍑芥暟
	   *
	   * @param callbackId - 鍥炶皟鍑芥暟ID
	   */


	  JSBridge.prototype.deregisterCallback = function (callbackId) {
	    delete this.callbackMap[callbackId];
	  };
	  /**
	   * 灏濊瘯鍒涘缓闇€瑕佺敤鍒扮殑涓や釜iframe
	   * 鍦ㄤ竴浜涗綆鐗堟湰娴忚鍣ㄥ唴鏍镐笂锛屽鏋滃湪DOM Ready涔嬪墠鎿嶄綔DOM
	   * 鍙兘浼氶樆鏂璂OM鐨勮В鏋愶紝瀵艰嚧椤甸潰娓叉煋澶辫触銆傚洜姝わ紝闇€瑕佷繚璇�
	   * 鍦―OM Ready涔嬪悗鍐嶅垱寤篿frame銆�
	   *
	   * issue: https://code.byted.org/ife/jsbridge/issues/8
	   */


	  JSBridge.prototype.tryCreateIFrames = function () {
	    var _this = this;

	    if (document.readyState === 'complete') {
	      this.dispatchMessageIFrame = this.createIFrame(DISPATCH_MESSAGE_IFRAME_ID);
	      this.setResultIFrame = this.createIFrame(SET_RESULT_IFRAME_ID); // 鐢ㄦ埛鏈夊彲鑳藉湪iframe鍒涘缓濂戒箣鍓嶅凡缁忓彂璧蜂簡鏂规硶璋冪敤
	      // 濡傛灉姝ゆ椂娑堟伅闃熷垪鏈夋秷鎭爢绉紝鍒欎富鍔ㄥ悜瀹㈡埛绔彂閫佽皟鐢ㄦ秷鎭�

	      if (this.javascriptMessageQueue.length > 0) {
	        this.dispatchMessageIFrame.src = "" + this.scheme + this.dispatchMessagePath;
	      }

	      return;
	    }

	    document.addEventListener('readystatechange', function () {
	      if (document.readyState !== 'complete') {
	        return;
	      }

	      _this.tryCreateIFrames();
	    });
	  };
	  /**
	   * 鍒涘缓iframe锛岀敤浜庡悜瀹㈡埛绔彂閫佹秷鎭�
	   *
	   * @param id - iframe鍏冪礌id
	   * @return - iframe鍏冪礌
	   */


	  JSBridge.prototype.createIFrame = function (id) {
	    var iframe = document.getElementById(id);

	    if (!iframe || iframe.tagName !== 'IFRAME') {
	      iframe = document.createElement('iframe');
	      iframe.style.display = 'none';
	      iframe.id = id;
	      document.documentElement.appendChild(iframe);
	    }

	    return iframe;
	  };

	  return JSBridge;
	}();

	var version$1 = "1.0.0-alpha.18";
	var global = typeof window !== 'undefined' ? window : {}; // 鍏煎ssr

	/**
	 * 澶存潯鏃х増鏈琂SBridge瀹炵幇锛堝彧閽堝澶存潯鏃х増鏈珹pp浣跨敤锛�
	 */

	var ToutiaoJSBridge =
	/** @class */
	function (_super) {
	  __extends(ToutiaoJSBridge, _super);

	  function ToutiaoJSBridge() {
	    var _this = _super.call(this, {
	      version: version$1,
	      scheme: 'bytedance://',
	      listenNativeEvent: true
	    }) || this;

	    _this.publicApi = {
	      call: _this.call.bind(_this),
	      on: _this.on.bind(_this),
	      once: _this.once.bind(_this),
	      off: _this.off.bind(_this),
	      trigger: _this.trigger.bind(_this),
	      _fetchQueue: _this.fetchJavaScriptMessageQueue.bind(_this),
	      _handleMessageFromToutiao: _this.handleMessageFromNative.bind(_this)
	    };
	    return _this;
	  }

	  ToutiaoJSBridge.prototype.exposePublicApiToGlobal = function () {
	    global.ToutiaoJSBridge = Object.assign(global.ToutiaoJSBridge || {}, this.publicApi);
	  };

	  return ToutiaoJSBridge;
	}(JSBridge);

	var userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''; // 鍏煎ssr
	// ua 鍒ゆ柇鏄惁涓哄ご鏉℃柟妗�
	// newsarticle锛氬ご鏉�
	// videoarticle锛氳タ鐡�
	// super锛氱毊鐨櫨 锛坰uper_lite鍜宻uper_pro锛�
	// lv: 鍓槧
	// faceu锛欶aceu
	// ulike 锝� beauty_me_: 杞婚
	// faceu-os锛歠aceu(娴峰鐗�)
	// ulike-os鎴朾eauty_me_oversea_锛氳交棰滄捣澶栫増
	// retouch锛歍椤圭洰
	// automobile锛氭噦杞﹀笣

	var isToutiaoEnvironment = !!userAgent.match(/(newsarticle|videoarticle|lv|faceu|ulike|beauty_me_|faceu-os|ulike-os|beauty_me_oversea_|retouch)\/([\d.]+)/i) || /super|automobile/gi.test(userAgent); // 澶勭悊faceu鍥藉唴鐗堥棶棰橈細鍥藉唴鏃㈡湁鎷︽埅涔熸湁娉ㄥ叆鏂瑰紡锛屼絾鏄嫤鎴柟寮忔病鏈夊洖璋�

	var useInjection = !!userAgent.match(/(faceu)\/([\d.]+)/i); // 鏃у箍鍛妛ebview sdk鐨勫疄鐜帮紝蹇呴』浣跨敤iframe鏂瑰紡涓攕chema涓篵ytedance
	// https://bytedance.feishu.cn/wiki/wikcnG3BE7Wr5MZ4hUFL187M9nd @maintainer锛歾hangyu.paul@bytedance.com

	var isLegacyAdEnvironment = !!userAgent.match(/ttad\/0/i);
	var global$1 = typeof window !== 'undefined' ? window : {}; // 鍏煎ssr

	/**
	 * 鎺㈡祴瀹㈡埛绔敞鍏ョ殑璋冪敤API
	 */

	function detectNativeMethodInvoker() {
	  var nativeMethodInvoker;

	  if (global$1.JS2NativeBridge && global$1.JS2NativeBridge._invokeMethod) {
	    // 鏍囧噯瀹炵幇
	    nativeMethodInvoker = function nativeMethodInvoker(message) {
	      return global$1.JS2NativeBridge._invokeMethod(JSON.stringify(message));
	    };
	  } else if (global$1.ToutiaoJSBridge && global$1.ToutiaoJSBridge.invokeMethod) {
	    // 铻嶅悎鍓岻ES鐨勫疄鐜�
	    nativeMethodInvoker = function nativeMethodInvoker(message) {
	      return global$1.ToutiaoJSBridge.invokeMethod(JSON.stringify(message));
	    };
	  } else if (global$1.JS2NativeBridge && global$1.JS2NativeBridge.call) {
	    // 铻嶅悎鍓嶅ご鏉＄殑瀹夊崜瀹炵幇
	    nativeMethodInvoker = function nativeMethodInvoker(message) {
	      return global$1.JS2NativeBridge.call(message.func, JSON.stringify(message));
	    };
	  } else if (global$1.webkit && global$1.webkit.messageHandlers && global$1.webkit.messageHandlers.callMethodParams) {
	    // 铻嶅悎鍓嶅ご鏉＄殑iOS WkWebview瀹炵幇
	    nativeMethodInvoker = function nativeMethodInvoker(message) {
	      return global$1.webkit.messageHandlers.callMethodParams.postMessage(message);
	    };
	  } else if (global$1.callMethodParams) {
	    // 铻嶅悎鍓嶅ご鏉＄殑iOS UIWebview瀹炵幇
	    nativeMethodInvoker = function nativeMethodInvoker(message) {
	      return global$1.callMethodParams(message.func, message);
	    };
	  }

	  return nativeMethodInvoker;
	}
	/**
	 * 鎺㈡祴瀹㈡埛绔敞鍏ョ殑浜嬩欢鐩戝惉鍣�
	 */


	function detectNativeEventListener() {
	  if (!isToutiaoEnvironment) {
	    return;
	  }

	  var nativeEventListener;

	  if (global$1.JSBridge && global$1.JSBridge.on) {
	    // 鏍囧噯瀹炵幇
	    nativeEventListener = global$1.JSBridge.on;
	  } else if (global$1.JS2NativeBridge && global$1.JS2NativeBridge.on) {
	    // 铻嶅悎鍓嶅ご鏉＄殑瀹夊崜瀹炵幇
	    nativeEventListener = function nativeEventListener(event) {
	      var eventMessage = {
	        JSSDK: version$1,
	        __msg_type: 'event',
	        __callback_id: event,
	        func: event
	      };
	      global$1.JS2NativeBridge.on(event, JSON.stringify(eventMessage));
	    };
	  } else if (global$1.webkit && global$1.webkit.messageHandlers && global$1.webkit.messageHandlers.onMethodParams) {
	    // 铻嶅悎鍓嶅ご鏉＄殑iOS WkWebview瀹炵幇            
	    nativeEventListener = function nativeEventListener(event) {
	      var eventMessage = {
	        JSSDK: version$1,
	        __msg_type: 'event',
	        __callback_id: event,
	        func: event
	      };
	      global$1.webkit.messageHandlers.onMethodParams.postMessage(eventMessage);
	    };
	  } else if (global$1.onMethodParams) {
	    // 铻嶅悎鍓嶅ご鏉＄殑iOS UIWebview瀹炵幇
	    nativeEventListener = function nativeEventListener(event) {
	      var eventMessage = {
	        JSSDK: version$1,
	        __msg_type: 'event',
	        __callback_id: event,
	        func: event
	      };
	      return global$1.onMethodParams(event, eventMessage);
	    };
	  }

	  return nativeEventListener;
	}
	/**
	 * 鎺㈡祴瀹㈡埛绔敮鎸佺殑scheme
	 */


	function detectScheme() {
	  if (isToutiaoEnvironment) {
	    return 'nativeapp://';
	  }

	  if (global$1.JSBridge && global$1.JSBridge._invokeMethod) {
	    return 'nativeapp://';
	  }

	  return 'bytedance://';
	}
	/**
	 * 铻嶅悎鍚庣殑JSBridge锛圛ES鎵€鏈夌増鏈珹pp鍙敤锛屽ご鏉℃柊鐗圓pp鍙敤锛�
	 */


	var BytedanceJSBridge =
	/** @class */
	function (_super) {
	  __extends(BytedanceJSBridge, _super);

	  function BytedanceJSBridge(toutiaoJSBridge) {
	    var _this = _super.call(this, {
	      version: version$1,
	      nativeMethodInvoker: detectNativeMethodInvoker(),
	      nativeEventListener: detectNativeEventListener(),
	      scheme: detectScheme(),
	      listenNativeEvent: isToutiaoEnvironment
	    }) || this;

	    _this.toutiaoLegacyJSB = toutiaoJSBridge;
	    _this.publicApi = {
	      call: _this.call.bind(_this),
	      on: _this.on.bind(_this),
	      once: _this.once.bind(_this),
	      off: _this.off.bind(_this),
	      trigger: _this.trigger.bind(_this),
	      _fetchQueue: _this.fetchJavaScriptMessageQueue.bind(_this),
	      _handleMessageFromApp: _this.handleMessageFromNative.bind(_this),
	      _handleMessageFromToutiao: _this.handleMessageFromNative.bind(_this)
	    };
	    return _this;
	  }
	  /**
	   * 璋冪敤瀹㈡埛绔柟娉�
	   *
	   * @param func - 鍑芥暟鍚嶇О
	   * @param params - 鍙傛暟
	   * @param callback - 鍥炶皟鍑芥暟
	   * @param options - JSSDK鐗堟湰鍙� 鎴栬€� option閰嶇疆: {sdkVersion,namespace}
	   */


	  BytedanceJSBridge.prototype.call = function (func, params, callback, options) {
	    if (options === void 0) {
	      options = version$1;
	    }

	    if (this.isLegacyCall(func)) {
	      this.toutiaoLegacyJSB.call(func, params, callback, options);
	    } else {
	      _super.prototype.call.call(this, func, params, callback, options);
	    }
	  };
	  /**
	   * 娉ㄥ唽浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callback - 鍥炶皟鍑芥暟
	   * @return - 鍥炶皟ID
	   */


	  BytedanceJSBridge.prototype.on = function (event, callback, once) {
	    if (once === void 0) {
	      once = false;
	    }

	    if (this.isLegacyCall(event)) {
	      return this.toutiaoLegacyJSB.on(event, callback, once);
	    } else {
	      return _super.prototype.on.call(this, event, callback, once);
	    }
	  };
	  /**
	   * 娉ㄥ唽鍗曟浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callback - 鍥炶皟鍑芥暟
	   * @return - 鍥炶皟ID
	   */


	  BytedanceJSBridge.prototype.once = function (event, callback) {
	    if (this.isLegacyCall(event)) {
	      return this.toutiaoLegacyJSB.once(event, callback);
	    } else {
	      return _super.prototype.once.call(this, event, callback);
	    }
	  };
	  /**
	   * 娉ㄩ攢浜嬩欢鐩戝惉鍣�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param callbackId - 鍥炶皟ID
	   * @return - 娉ㄩ攢缁撴灉
	   */


	  BytedanceJSBridge.prototype.off = function (event, callbackId) {
	    if (this.isLegacyCall(event)) {
	      return this.toutiaoLegacyJSB.off(event, callbackId);
	    } else {
	      return _super.prototype.off.call(this, event, callbackId);
	    }
	  };
	  /**
	   * 妯℃嫙瀹㈡埛绔Е鍙戜簨浠�
	   *
	   * @param event - 浜嬩欢鍚嶇О
	   * @param params - 浜嬩欢鍙傛暟
	   */


	  BytedanceJSBridge.prototype.trigger = function (event, params) {
	    if (this.isLegacyCall(event)) {
	      return this.toutiaoLegacyJSB.trigger(event, params);
	    } else {
	      return _super.prototype.trigger.call(this, event, params);
	    }
	  };

	  BytedanceJSBridge.prototype.exposePublicApiToGlobal = function () {
	    global$1.JSBridge = Object.assign(global$1.JSBridge || {}, this.publicApi); // 鍏煎閭ｄ簺闈炲ご鏉＄幆澧冧絾鏄娇鐢ㄨ繃2.0鍗忚鐨刟pp

	    global$1.Native2JSBridge = Object.assign(global$1.Native2JSBridge || {}, this.publicApi);

	    if (isToutiaoEnvironment && this.toutiaoLegacyJSB) {
	      this.toutiaoLegacyJSB.exposePublicApiToGlobal();
	    } else {
	      global$1.ToutiaoJSBridge = Object.assign(global$1.ToutiaoJSBridge || {}, this.publicApi);
	    } // 灏唚indow涓嬬殑ToutiaoJSBridge鍜孞SBridge璁剧疆鎴愪笉鍙啓锛岄伩鍏嶈鍏朵粬娉ㄥ叆鐨刯sb瑕嗙洊


	    Object.defineProperties(global$1, {
	      'JSBridge': {
	        writable: false
	      },
	      'Native2JSBridge': {
	        writable: false
	      },
	      'ToutiaoJSBridge': {
	        writable: false
	      }
	    }); // 鍐荤粨鍏ㄥ眬JSB瀵硅薄锛岄槻姝㈣鏀瑰啓

	    Object.freeze(global$1.JSBridge);
	    Object.freeze(global$1.Native2JSBridge);
	    Object.freeze(global$1.ToutiaoJSBridge);
	  };
	  /**
	   * 鍒ゆ柇鏄惁鏄ご鏉℃棫瀹炵幇锛屽ご鏉℃柊瀹炵幇鏂规硶鍚嶉兘甯�"."
	   *
	   * @param func - 鍑芥暟鍚嶇О
	   */


	  BytedanceJSBridge.prototype.isLegacyCall = function (func) {
	    if (!func || typeof func !== 'string' || !this.toutiaoLegacyJSB) {
	      return false;
	    }

	    if (isLegacyAdEnvironment) {
	      return true;
	    }

	    if (useInjection) {
	      return false;
	    }

	    return isToutiaoEnvironment && func.indexOf('.') < 0;
	  };

	  return BytedanceJSBridge;
	}(JSBridge);

	var toutiaoJSBridge = new ToutiaoJSBridge();
	var bytedanceJSBridge = new BytedanceJSBridge(toutiaoJSBridge);

	try {
	  // 鏆撮湶鍏叡Api鍒板叏灞€鐜
	  bytedanceJSBridge.exposePublicApiToGlobal();
	} catch (error) {
	  console.warn(error.message);
	} // ! 涓嶈兘export { bytedance } !
	// 鍦╱md鏍煎紡涓嬫槸 JSBridge.bytedance = bytedanceJSBridge.publicApi锛屼絾鏄疛SBridge宸茬粡琚玣reeze浜嗭紝鎵€浠ヤ細鎶ラ敊
	// export { bytedance }


	var bytedance = bytedanceJSBridge.publicApi;

	function getRuntimeEnv(ctx, callback) {
	  if (typeof window === 'undefined') {
	    return {};
	  }

	  var userAgent = navigator.userAgent.toLowerCase();
	  var os = ctx.os;
	  var APP_VERSION_REGX = {
	    'android': new RegExp('app_version/', 'i'),
	    'ios': new RegExp('aweme_', 'i')
	  };

	  try {
	    var version = userAgent.split(APP_VERSION_REGX[os])[1];

	    if (version && typeof version === 'string') {
	      version = version.split(' ')[0];
	    } else {
	      throw new Error();
	    }

	    callback(null, {
	      appid: 990003,
	      version: version
	    });
	  } catch (e) {
	    console.log('鏈幏鍙栧埌鎶栭煶瀹㈡埛绔俊鎭�');
	  }
	}

	var ObjProto = Object.prototype;
	var hasOwnProperty = ObjProto.hasOwnProperty,
	    toString = ObjProto.toString;
	var util = {
	  hasOwnProp: function hasOwnProp(obj, prop) {
	    if (this.isObject(obj)) {
	      return hasOwnProperty.call(obj, prop);
	    }

	    return false;
	  },
	  isEmpty: function isEmpty(obj) {
	    if (obj == null) {
	      return true;
	    }

	    return this.getProLen(obj) === 0;
	  },
	  getType: function getType(input) {
	    return toString.call(input).match(/\[object (\w+)\]/)[1];
	  },
	  getProLen: function getProLen(obj) {
	    var len = 0;

	    if (this.isObject(obj)) {
	      len = Object.keys(obj).length;
	    }

	    return len;
	  },
	  verCompare: function verCompare(v1, v2) {
	    if (v1 === v2) {
	      return 0;
	    }

	    var v1Arr = v1.toString().split('.');
	    var v2Arr = v2.toString().split('.');

	    while (v1Arr.length < v2Arr.length) {
	      v1Arr.push('0');
	    }

	    while (v2Arr.length < v1Arr.length) {
	      v2Arr.push('0');
	    }

	    var i = 0;

	    while (i < v1Arr.length) {
	      var v1Num = Number(v1Arr[i]);
	      var v2Num = Number(v2Arr[i]);

	      if (v2Num > v1Num) {
	        return -1;
	      } else if (v2Num < v1Num) {
	        return 1;
	      } else if (v2Num < v1Num) {
	        return 0;
	      }

	      i += 1;
	    }

	    return 0;
	  },
	  warn: function warn(msg) {
	    console.warn("[via]: " + msg);
	  },
	  error: function error(msg) {
	    console.error("[via]: " + msg);
	  }
	};
	['Number', 'Date', 'Object', 'String', 'Function', 'Boolean', 'Null', 'Undefined', 'Array'].forEach(function (type) {
	  util["is" + type] = function (input) {
	    var result = toString.call(input) === "[object " + type + "]";
	    return result;
	  };
	});

	function isVersionTargeted(version, targetAppVersion) {
	  if (targetAppVersion === undefined || targetAppVersion === '*') {
	    return true;
	  }

	  var rules = String(targetAppVersion).split('|').map(function (rule) {
	    var chunks = rule.split('-');
	    var r = '';

	    switch (chunks.length) {
	      case 1:
	        r = chunks[0];
	        break;

	      case 2:
	        r = {
	          min: chunks[0],
	          max: chunks[1]
	        };
	        break;
	    }

	    return r;
	  }).filter(function (rule) {
	    return rule;
	  });
	  return rules.some(function (rule) {
	    if (util.isString(rule)) {
	      return rule === version;
	    } else if (util.isObject(rule)) {
	      var min = rule.min;
	      var max = rule.max;
	      var b = true;

	      if (min) {
	        b = b && util.verCompare(version, min) !== -1;
	      }

	      if (max) {
	        b = b && util.verCompare(version, max) !== 1;
	      }

	      return b;
	    }

	    return false;
	  });
	}

	function checkCondition(env, targetCondition) {
	  var appid = env.appid,
	      container = env.container,
	      os = env.os,
	      version = env.version;

	  if (Array.isArray(targetCondition)) {
	    return targetCondition.some(function (item) {
	      return checkCondition(env, item);
	    });
	  }

	  if (targetCondition.appid !== '*' && targetCondition.appid !== appid) {
	    return false;
	  }

	  if (targetCondition.container !== '*' && targetCondition.container !== container) {
	    return false;
	  }

	  if (targetCondition.os !== '*' && targetCondition.os !== os) {
	    return false;
	  }

	  if (targetCondition.version !== '*' && !isVersionTargeted(version, targetCondition.version)) {
	    return false;
	  }

	  return true;
	}

	var isBrowser = typeof window !== 'undefined';

	var Core = /*#__PURE__*/function () {
	  function Core() {
	    this.bridge = window.JSBridge; // 浣跨敤鍏ㄥ眬瀵硅薄锛岃В鍐抽噸澶嶅紩鍏ョ殑闂
	  }

	  var _proto = Core.prototype;

	  _proto.init = function init() {
	    var _this = this;

	    this.getEnv = new Promise(function (resolve, reject) {
	      var ua = isBrowser ? window.navigator.userAgent : '';
	      var isAndroid = /(Android);?\s+([\d.]+)?/i.test(ua);
	      var os = isAndroid ? 'android' : 'ios';
	      var env = {
	        // TODO 鏆傛椂鍙敮鎸亀eb
	        container: 'web',
	        os: os
	      };

	      if (isBrowser) {
	        getRuntimeEnv({
	          jsb: _this.bridge,
	          container: 'web',
	          os: os
	        }, function (err, res) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(Object.assign(env, res));
	          }
	        });
	      } else {
	        resolve(env);
	      }
	    });
	  };

	  _proto.getRuleForMethod = function getRuleForMethod(env, method, rules) {
	    return rules.find(function (rule) {
	      return checkCondition(env, rule.target);
	    }) || {};
	  };

	  _proto.transformConfig = /*#__PURE__*/function () {
	    var _transformConfig = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(method, params, rules) {
	      var env, rule, realMethod, realParams;
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return this.getEnv;

	            case 2:
	              env = _context.sent;
	              rule = this.getRuleForMethod(env, method, rules);

	              if (!rule && true) {
	                console.warn("no matching rules found");
	              }

	              realMethod = rule.map && rule.map.method || method;

	              {
	                console.info("call real method: " + realMethod);
	              }

	              realParams = rule.preprocess ? rule.preprocess(params, {
	                env: env,
	                bridge: this.bridge
	              }) : params;
	              return _context.abrupt("return", {
	                realMethod: realMethod,
	                realParams: realParams,
	                rule: rule,
	                env: env
	              });

	            case 9:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));

	    function transformConfig(_x, _x2, _x3) {
	      return _transformConfig.apply(this, arguments);
	    }

	    return transformConfig;
	  }();

	  _proto.addInternalBridge = function addInternalBridge(bridges) {
	    for (var bridge in bridges) {
	      this[bridge] = bridges[bridge];
	    }
	  }
	  /**
	   * 娉ㄥ唽鏂规硶
	   * @param {String} id - 鏂规硶鏍囪瘑
	   * @param {Object} config - 閰嶇疆
	   */
	  ;

	  _proto.register = function register(id, config) {
	    var _this2 = this;

	    if (config === void 0) {
	      config = {};
	    }

	    var match = String(id).match(/^(\w+)\.(\w+)$/);

	    if (!match) {
	      throw new Error("[bridge]: invalid method id '" + id + "'");
	    }

	    var scope = match[1];
	    var method = match[2];
	    var _config = config,
	        _config$rules = _config.rules,
	        rules = _config$rules === void 0 ? [] : _config$rules,
	        _config$type = _config.type,
	        type = _config$type === void 0 ? 'call' : _config$type;
	    this[scope] = this[scope] || {};

	    if (type === 'call') {
	      this[scope][method] = function (params, callback) {
	        return _this2.pipeCall({
	          method: method,
	          params: params,
	          callback: callback,
	          rules: rules
	        });
	      };
	    } else {
	      this[scope][method] = /*#__PURE__*/function () {
	        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(callback, once) {
	          return regenerator.wrap(function _callee2$(_context2) {
	            while (1) {
	              switch (_context2.prev = _context2.next) {
	                case 0:
	                  return _context2.abrupt("return", _this2.pipeEvent({
	                    event: method,
	                    callback: callback,
	                    rules: rules,
	                    once: once
	                  }));

	                case 1:
	                case "end":
	                  return _context2.stop();
	              }
	            }
	          }, _callee2);
	        }));

	        return function (_x4, _x5) {
	          return _ref.apply(this, arguments);
	        };
	      }();
	    }

	    return this;
	  };

	  _proto.pipeCall = /*#__PURE__*/function () {
	    var _pipeCall = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_ref2, usePromise) {
	      var _this3 = this;

	      var method, params, callback, rules, _yield$this$transform, realMethod, realParams, rule, env;

	      return regenerator.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              method = _ref2.method, params = _ref2.params, callback = _ref2.callback, rules = _ref2.rules;

	              if (usePromise === void 0) {
	                usePromise = true;
	              }

	              _context3.next = 4;
	              return this.transformConfig(method, params, rules);

	            case 4:
	              _yield$this$transform = _context3.sent;
	              realMethod = _yield$this$transform.realMethod;
	              realParams = _yield$this$transform.realParams;
	              rule = _yield$this$transform.rule;
	              env = _yield$this$transform.env;

	              if (!usePromise) {
	                _context3.next = 13;
	                break;
	              }

	              return _context3.abrupt("return", new Promise(function (resolve) {
	                _this3.bridge.call(realMethod, realParams, function (res) {
	                  var realRes = res;

	                  if (rule.postprocess && typeof rule.postprocess === 'function') {
	                    realRes = rule.postprocess(res, {
	                      params: params,
	                      env: env
	                    });
	                  }

	                  if (typeof callback === 'function') {
	                    callback(realRes);
	                  }

	                  resolve(realRes);
	                });
	              }));

	            case 13:
	              return _context3.abrupt("return", this.bridge.call(realMethod, realParams, function (res) {
	                if (rule.postprocess && typeof rule.postprocess === 'function') {
	                  rule.postprocess(res, {
	                    params: params,
	                    env: env
	                  });
	                }
	              }));

	            case 14:
	            case "end":
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    }));

	    function pipeCall(_x6, _x7) {
	      return _pipeCall.apply(this, arguments);
	    }

	    return pipeCall;
	  }();

	  _proto.pipeEvent = function pipeEvent(_ref3) {
	    var _this4 = this;

	    var event = _ref3.event,
	        callback = _ref3.callback,
	        rules = _ref3.rules,
	        once = _ref3.once;
	    var promise = this.transformConfig(event, null, rules);
	    var excutor = promise.then(function (_ref4) {
	      var realMethod = _ref4.realMethod,
	          rule = _ref4.rule,
	          env = _ref4.env;

	      function realCallback(res) {
	        var realRes = rule.postprocess ? rule.postprocess(res, env) : res;

	        if (rule.postprocess) {
	          if (realRes !== null) {
	            // 绾﹀畾濡傛灉杩斿洖闄ull浠ュ鐨勪换浣曟暟鎹墠璋冪敤callback
	            callback(realRes);
	          }
	        } else {
	          callback(realRes);
	        }
	      }

	      var callbackId = _this4.bridge.on(realMethod, realCallback, once);

	      return {
	        realMethod: realMethod,
	        callbackId: callbackId
	      };
	    });
	    return {
	      remove: function remove() {
	        var _this5 = this;

	        excutor.then(function (_ref5) {
	          var realMethod = _ref5.realMethod,
	              callbackId = _ref5.callbackId;

	          _this5.bridge.off(realMethod, callbackId);
	        });
	      },
	      listener: callback
	    };
	  };

	  return Core;
	}();

	var core = new Core();
	core.init();

	var rules = [{
	  target: [{
	    hostId: 990003,
	    appid: 990003,
	    os: "*",
	    version: "0.0.0-",
	    container: "web"
	  }],
	  map: {
	    method: "openConfig"
	  },
	  preprocess: function preprocess(params, context) {
	    function verCompare(v1, v2) {
	      if (v1 === v2) {
	        return 0;
	      }

	      var v1Arr = v1.toString().split(".");
	      var v2Arr = v2.toString().split(".");

	      while (v1Arr.length < v2Arr.length) {
	        v1Arr.push("0");
	      }

	      while (v2Arr.length < v1Arr.length) {
	        v2Arr.push("0");
	      }

	      var i = 0;

	      while (i < v1Arr.length) {
	        var v1Num = Number(v1Arr[i]);
	        var v2Num = Number(v2Arr[i]);

	        if (v2Num > v1Num) {
	          return -1;
	        } else if (v2Num < v1Num) {
	          return 1;
	        } else if (v2Num < v1Num) {
	          return 0;
	        }

	        i += 1;
	      }

	      return 0;
	    }

	    var _ref = context || {},
	        bridge = _ref.bridge,
	        env = _ref.env;

	    var version = env.version;

	    if (verCompare(version, "10.4.0") < 0) {
	      bridge.trigger("openConfigError", {
	        status_code: -1,
	        status_msg: "涓嶆敮鎸佺殑鎶栭煶瀹㈡埛绔増鏈�"
	      });
	      return {};
	    }

	    var jsonStr = "{}";

	    try {
	      jsonStr = JSON.stringify(params.params);
	    } catch (e) {}

	    return {
	      config_json: jsonStr
	    };
	  }
	}];

	function config(params, callback) {
	    return core.pipeCall({
	        method: "config",
	        params: params,
	        callback: callback,
	        rules: rules,
	    }, true);
	}

	var rules$1 = [{
	  target: [{
	    hostId: 990003,
	    appid: 990003,
	    os: "*",
	    version: "10.2.0-",
	    container: "web"
	  }],
	  map: {
	    method: "jumpOpenAuthPage"
	  },
	  preprocess: function preprocess(params, context) {
	    var requestParams = params.params;
	    return requestParams;
	  },
	  postprocess: function preprocess(res, context) {
	    res = res.data || res;
	    var params = context.params;
	    var success = params.success,
	        error = params.error;
	    var _res = res,
	        response = _res.response,
	        code = _res.errorCode,
	        msg = _res.errorMsg;

	    var _ref = response || {},
	        ticket = _ref.ticket;

	    if (ticket) {
	      typeof success === "function" && success({
	        code: 0,
	        msg: "success",
	        ticket: ticket
	      });
	    } else {
	      typeof error === "function" && error({
	        code: code,
	        msg: msg,
	        res: res
	      });
	    }
	  }
	}];

	function jumpOpenAuth(params, callback) {
	    return core.pipeCall({
	        method: "jumpOpenAuth",
	        params: params,
	        callback: callback,
	        rules: rules$1,
	    }, true);
	}

	var rules$2 = [{
	  target: [{
	    hostId: 990003,
	    appid: 990003,
	    os: "*",
	    version: "0.0.0-",
	    container: "web"
	  }],
	  map: {
	    method: "openConfigSuccess"
	  }
	}];

	function ready(callback, once) {
	    return core.pipeEvent({
	        event: "ready",
	        callback: callback,
	        rules: rules$2,
	        once: once,
	    });
	}

	var rules$3 = [{
	  target: [{
	    hostId: 990003,
	    appid: 990003,
	    os: "*",
	    version: "0.0.0-",
	    container: "web"
	  }],
	  map: {
	    method: "openConfigError"
	  }
	}];

	function error(callback, once) {
	    return core.pipeEvent({
	        event: "error",
	        callback: callback,
	        rules: rules$3,
	        once: once,
	    });
	}

	var rules$4 = [{
	  target: [{
	    hostId: 990003,
	    appid: 990003,
	    os: "*",
	    version: "10.8.0-",
	    container: "web"
	  }],
	  map: {
	    method: "showOpenAuth"
	  },
	  preprocess: function preprocess(params, context) {
	    var requestParams = params.params;
	    return requestParams;
	  },
	  postprocess: function preprocess(res, context) {
	    res = res.data || res;
	    var params = context.params;
	    var success = params.success,
	        error = params.error;
	    var _res = res,
	        response = _res.response,
	        code = _res.errorCode,
	        msg = _res.errorMsg;

	    var _ref = response || {},
	        ticket = _ref.ticket;

	    if (ticket) {
	      typeof success === "function" && success({
	        code: 0,
	        msg: "success",
	        ticket: ticket,
	        response: response
	      });
	    } else {
	      typeof error === "function" && error({
	        code: code,
	        msg: msg,
	        res: res
	      });
	    }
	  }
	}];

	function showOpenAuth(params, callback) {
	    return core.pipeCall({
	        method: "showOpenAuth",
	        params: params,
	        callback: callback,
	        rules: rules$4,
	    }, true);
	}

	core.addInternalBridge({
	    config: config,
	    jumpOpenAuth: jumpOpenAuth,
	    ready: ready,
	    error: error,
	    showOpenAuth: showOpenAuth,
	});
	var register = core.register.bind(core);
	var index = {
	    config: config,
	    jumpOpenAuth: jumpOpenAuth,
	    ready: ready,
	    error: error,
	    showOpenAuth: showOpenAuth,
	    register: register,
	};

	exports.bridge = bytedance;
	exports.config = config;
	exports.default = index;
	exports.error = error;
	exports.jumpOpenAuth = jumpOpenAuth;
	exports.ready = ready;
	exports.register = register;
	exports.showOpenAuth = showOpenAuth;

	Object.defineProperty(exports, '__esModule', { value: true });

})));