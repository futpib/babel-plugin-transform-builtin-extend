import {expect} from 'chai';

describe('standard extension', function(){
    describe('Array', function(){
        class MyArray extends Array {
            constructor(){
                super();
                Object.defineProperty(this, '_i', {
                    writable: true,
                    value: 0,
                });
            }

            myPush(){
                this.push(this._i++);
            }
        }

        it('should behave properly', function(){
            const a = new MyArray();

            expect(Array.isArray(a)).to.be.true;
            expect(a instanceof MyArray).to.be.true;

            a.myPush();
            a.myPush();
            expect(a).to.eql([0, 1]);

            a[20] = 'foo';

            expect(a.length).to.eql(21);
        });
    });

    describe('Error', function(){
        class MyError extends Error {
            constructor(message){
                super(message);
            }
        }

        it('should behave properly', function(){
            const a = new MyError('a message');

            expect(a instanceof MyError).to.be.true;

            expect(a).to.have.ownProperty('message');
            expect(a).to.have.ownProperty('stack');

            expect(a.message).to.eql('a message');
        });
    });

    describe('Function', function(){
        class MyFunction extends Function {
            constructor() {
                super('return arguments.callee.apply(this, arguments);');
            }

            apply(thisArg, args) {
                return args[0] + 1;
            }
        }

        it('should behave properly', function(){
            const f = new MyFunction();

            expect(f instanceof MyFunction).to.be.true;
            expect(f instanceof Function).to.be.true;

            expect(typeof f).to.eql('function');

            expect(f).to.have.property('call');
            expect(f).to.have.property('apply');

            expect(f(1)).to.eql(2);
            expect(f.call(null, 2)).to.eql(3);
            expect(f.apply(null, [3])).to.eql(4);
        });
    });
});
