/*
TODO : passage en Ts => voir les projets TypeScript et/ou Knockout : http://yeoman.io/generators/
TODO : tester https://mbest.github.io/knockout.punches/
*/

var viewModel = {
    isReporte: ko.observable(false),
    reporter: function() {
        this.isReporte(true)
    }
};

function performEffect(element, when, allBindings) {
    var value = allBindings.get("effectEquals");
    if (value === undefined) {
        value = true;
    }
    if (when !== value) {
        return;
    }

    var $element = $(element);
    var params   = allBindings.get("effect");
    var effects  = ("" + params).split(",");
    ko.utils.arrayForEach(effects, function (effect) {
        var [effectName, effectDuration] = effect.split(":");
        if (typeof effectDuration === "string") {
            effectDuration = effectDuration.trim();
        }
        if ($.isNumeric(effectDuration)) {
            effectDuration = parseInt(effectDuration);
        }
        $element = $element[effectName.trim()](effectDuration);
    });
}

ko.bindingHandlers.effectWhen = {
    update: function(element, propAccessor, allBindings) {
        var prop = propAccessor();
        if (!ko.isObservable(prop)) {
            return;
        }
        prop.subscribe(function(newValue) {
            performEffect(element, newValue, allBindings);
        });
    }
};

$(function() {
    ko.applyBindings(viewModel);
});
