describe("Input Tests", function() {

    beforeEach(function() {
        var result = yr.run('main', {input: true});
        $('.content').html(result);

        nb.init();
        this.input = nb.find('input');
    });

    afterEach(function() {
        delete this.input;
    });

    describe("Init", function() {
        it("should be inited", function() {
            expect(this.input).to.not.equal(null);
        });
    });

    describe("#YATE API", function() {
        describe("error", function() {
            it("error params", function() {
                var input = nb.find('input-error');
                var data = this.input.nbdata();
                expect(input.$node.attr('data-nb-error')).to.be.ok();
            });
            it("error dropdown", function() {
                var input = nb.find('input-error');
                var data = input.nbdata();
                expect($('#' + data.error.id)).to.be.ok();
            });

            it("error dropdown content", function() {
                var input = nb.find('input-error');
                var data = input.nbdata();
                expect($('#' + data.error.id + ' ._nb-popup-content').html()).to.be.equal('error');
            });
        });

        describe("Hint", function() {
            it("markup for hint", function() {
                var input = nb.find('input-hint');
                expect($(input.node).find('._nb-input-hint-inner').html()).to.equal('email');
            });

            it("markup for ghost hint", function() {
                var input = nb.find('input-hint-ghost');
                expect(input.$hint.find('._nb-input-hint-content').html()).to.equal('email');
            });

            it("Hint should be hidden then value set.", function() {
                var input = nb.find('input-hint');
                input.setValue('Vadim');
                expect(input.$hint.css('visibility')).to.equal('hidden');
            });
            it("Hint should be hidden then input focused", function() {
                var input = nb.find('input-hint-ghost');
                input.focus();
                expect(input.$hint.css('visibility')).to.equal('hidden');
            });

            it("Hint should not be visible if we have content", function() {
                var input = nb.find('input-hint-content');
                expect(input.$node.find('._nb-input-hint').length).to.equal(0);
            });
        });

        describe("Tabindex", function() {
            it("Simple input", function() {
                var input = nb.find('input-tabindex-simple');
                expect(input.$node.attr('tabindex')).to.equal('1');
            });

            it("Complex input", function() {
                var input = nb.find('input-tabindex-complex');
                expect(input.$control.attr('tabindex')).to.equal('1');
            });
        });

        describe("prefix postfix", function() {
            it("markup left", function() {
                var input = nb.find('input-left-right');
                expect(input.$node.find('._nb-input-left').length).to.equal(1);
            });
            it("content left", function() {
                var input = nb.find('input-left-right');
                expect(input.$node.find('._nb-input-left').html()).to.equal('prefix');
            });
            it("markup right", function() {
                var input = nb.find('input-left-right');
                expect(input.$node.find('._nb-input-right').length).to.equal(1);
            });
            it("content right", function() {
                var input = nb.find('input-left-right');
                expect(input.$node.find('._nb-input-right').html()).to.equal('postfix');
            });
        });

        it("Input with reset param should have reset markup", function() {
            var input = nb.find('input-reset');
            expect(input.$reset.length).to.be.equal(1);
        });

        it("reset should be hidden after reset()", function() {
            var input = nb.find('input-reset');
            input.reset();
            expect(input.$reset.css('visibility')).to.equal('hidden');
        });

        it("reset should be hidden with empty value", function() {
            var input = nb.find('input-reset-empty');
            expect(input.$reset.css('visibility')).to.equal('hidden');
        });

        it("Input with reset param should be complex", function() {
            var input = nb.find('input-reset');
            expect(input.nbdata().type).to.not.equal('simple');
        });

        it('Simple multiline input should output escaped content as a textarea value', function() {
            var input = nb.find('escape-multiline-simple');
            expect(input.getValue()).to.be("\">'></textarea></script><img/src='x'onerror=alert(1)>");
        });

        it('Complex multiline input should output escaped content as a textarea value', function() {
            var input = nb.find('escape-multiline');
            expect(input.getValue()).to.be("\">'></textarea></script><img/src='x'onerror=alert(1)>");
        });
    });


    describe("Events", function() {
        it("should fire nb-changed event", function() {
            var result = false;

            this.input.on('nb-changed', function() {
                result = true;
            });

            this.input.$control.val("Zzzzap!");
            this.input.$control.trigger('change');

            expect(result).to.be.ok();
        });

        it("nb-changed event should provide block", function() {
            var result = false;

            this.input.on('nb-changed', function(name, block, event) {
                result = this.$node.attr('id') == block.$node.attr('id');
            });

            this.input.$control.val("Zzzzap!");
            this.input.$control.trigger('change');

            expect(result).to.be.ok();
        });

        it("should fire nb-changed event on .setValue()", function() {
            var result = false;

            this.input.on('nb-changed', function() {
                result = true;
            });

            this.input.setValue("Zzzzap!");

            expect(result).to.be.ok();
        });

        it("should not fire nb-changed event on .setValue() if actual value stay the same", function() {
            var result = false;

            this.input.on('nb-changed', function() {
                result = true;
            });

            var value = this.input.getValue();
            this.input.setValue(value);

            expect(result).to.not.be.ok();
        });
    });

    describe('#getType()', function() {
        it('should return input type', function() {
            expect(this.input.getType()).to.be.equal('input');
        });
    });

    describe("showError()", function() {
        it("error should be visible", function() {
            var input = nb.find('input-error');
            var data = input.nbdata();
            input.showError();
            expect($(nb.find(data.error.id).node).contextDialog("isOpen")).to.be.ok();
        });
    });

    describe("showError()", function() {
        it("show have class param", function() {
            var input = nb.find('input-error');
            var data = input.nbdata();
            input.hideError();
            input.showError({class: 'test'});
            expect($(nb.find(data.error.id).node).contextDialog().parent().is('.test')).to.be.ok();
        });
    });

    describe("showError()", function() {
        it("should return focus to input", function() {
            var input = nb.find('input-error');
            input.focus();
            input.showError();
            expect(input.focused).to.be.ok();
        });
    });

    describe("hideError()", function() {
        it("error should be hidden", function() {
            var input = nb.find('input-error');
            var data = input.nbdata();
            input.showError();
            input.hideError();
            expect($(nb.find(data.error.id).node).contextDialog("isOpen")).to.not.be.ok();
        });
    });

    describe("hideError()", function() {
        it("should not take focus", function() {
            var input = nb.find('input-error');
            input.hideError();
            input.focus();
            input.showError();
            input.hideError();
            expect($.contains(input.$node.get(0), document.activeElement)).to.be.ok();
        });
    });

    describe("showError()", function() {
        it("should not take focus", function() {
            var input = nb.find('input-error');
            input.hideError();
            input.focus();
            input.showError();
            expect($.contains(input.$node.get(0), document.activeElement)).to.be.ok();
        });
    });

    describe("setErrorContent()", function() {
        it("should set a new content for error", function() {
            var input = nb.find('input-error');
            var data = input.nbdata();
            input.setErrorContent('1');
            expect(nb.find(data.error.id).$node.find('._nb-popup-content').html()).to.equal('1');
        });

        it("should throws nb-error-content-set event", function() {
            var handlerWorks = false;
            var input = nb.find('input-error');

            input.on('nb-error-content-set', function() {
                handlerWorks = true;
            });

            input.setErrorContent('1');

            expect(handlerWorks).to.be.ok();
        });
    });

    describe("#focus()", function() {
        it("should throws nb-focused event", function() {
            var handlerWorks = false;
            this.input.on('nb-focused', function() {
                handlerWorks = true;
            });

            this.input.focus();

            expect(handlerWorks).to.be.ok();
        });

        it("focus() shouldn't throws nb-blured", function() {
            var handlerWorks = 0;
            this.input.on('nb-blured', function() {
                handlerWorks++;
            });

            this.input.focus();

            expect(handlerWorks).to.equal(0);
        });

        it("should throws global nb- focusout event", function() {
            var handlerWorks = false;
            nb.on('nb-focusout', function() {
                handlerWorks = true;
            });
            this.input.focus();

            expect(handlerWorks).to.be.ok();
        });

        it("should be in focus", function() {
            this.input.blur();
            this.input.focus();
            expect(this.input.focused).to.be.ok();
        });
    });

    describe("#blur()", function() {
        it("should not to be in focus", function() {
            this.input.focus();
            this.input.blur();
            expect(this.input.$control.is(":focus")).not.to.be.ok();
        });

        it("should throws blur event", function() {
            var handlerWorks = 0;
            this.input.focus();
            this.input.on('nb-blured', function() {
                handlerWorks++;
            });
            this.input.blur();

            expect(handlerWorks).to.equal(1);
        });
    });

    describe("#disable()", function() {
        it("should be disabled", function() {
            this.input.disable();

            expect(this.input.$control.prop('disabled')).to.be.ok();
        });
    });

    describe("#enable()", function() {
        it("should be enabled", function() {
            this.input.enable();

            expect(this.input.$control.prop('disabled')).not.to.be.ok();
        });
    });

    describe("#isEnabled()", function() {
        it("should return true when enabled", function() {
            expect(this.input.isEnabled()).to.be.ok();
        });

        it("should return false when disabled", function() {
            this.input.disable();
            expect(this.input.isEnabled()).not.to.be.ok();
        });
    });

    describe("#setValue()", function() {
        it("should change the value", function() {
            this.input.setValue('Vadim');

            expect(this.input.$control.val()).to.be.equal('Vadim');
        });

        it("should throws nb-value-set event", function() {
            var handlerWorks = false;
            this.input.on('nb-value-set', function() {
                handlerWorks = true;
            });
            this.input.setValue('Vadim');

            expect(handlerWorks).to.be.ok();
        });
    });

    describe("#setName()", function() {
        it("should change the value", function() {
            this.input.setName('Vadim');

            expect(this.input.$control.attr('name')).to.be.equal('Vadim');
        });

        it("should throws nb-name-set event", function() {
            var handlerWorks = false;
            this.input.on('nb-name-set', function() {
                handlerWorks = true;
            });
            this.input.setName('Vadim');

            expect(handlerWorks).to.be.ok();
        });
    });

    describe("#getValue()", function() {
        it("should return the value", function() {
            expect(this.input.getValue()).to.be.equal('Viktor');
        });
    });

    describe("#getName()", function() {
        it("should return the name", function() {
            expect(this.input.getName()).to.be.equal('last-name');
        });
    });

    describe("#reset()", function() {
        it("should reset value", function() {
            var input = nb.find('input-reset');
            input.setValue('privet');
            input.reset();
            expect(input.getValue()).to.be.equal('');
        });

        it("should throws nb-value-set", function() {
            var input = nb.find('input-reset');
            input.setValue('privet');

            var handlerWorks = false;
            input.on('nb-value-set', function() {
                handlerWorks = true;
            });

            input.reset();

            expect(handlerWorks).to.be.ok();
        });
    });

    describe("#getPlaceholder()", function() {
        it("should return hint", function() {
            var input = nb.find('input-hint');
            expect(input.getHint()).to.equal('email');
        });

        it("should return ghost hint", function() {
            var input = nb.find('input-hint-ghost');
            expect(input.getHint()).to.equal('email');
        });

    });

    describe("#setPlaceholder()", function() {
        it("should set hint", function() {
            var input = nb.find('input-hint');

            input.setHint('new');

            expect(input.getHint()).to.equal('new');
        });

        it("should set ghost hint", function() {
            var input = nb.find('input-hint-ghost');

            input.setHint('new');

            expect(input.getHint()).to.equal('new');
        });

        it("should throws nb-hint-set", function() {
            var input = nb.find('input-hint');


            var handlerWorks = false;
            input.on('nb-hint-set', function() {
                handlerWorks = true;
            });

            input.setHint('new');

            expect(handlerWorks).to.be.ok();
        });

    });

    describe('#destroy()', function() {
        it("should destroy error node", function() {
            var input = nb.find('input-error');
            input.showError();
            input.destroy();
            expect($(input.data.error.id).length).to.be.equal(0);
        });

        it("should destroy nb.block", function() {
            this.input.destroy();
            expect(nb.hasBlock($('#input')[0])).to.be.equal(false);
        });
    })
});
