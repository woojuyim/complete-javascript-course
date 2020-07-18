var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
    var Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    return {
        addItem: function(type, des, val) {
            var newItem, ID

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }
            data.allItems[type].push(newItem);

            return newItem
        },
        testing: function() {
            console.log(data)
        }
    }
})();

var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                val: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        clearFields: function() {
            var fields
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' +
                DOMstrings.inputValue)
            console.log(fields)
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = ""
            })

            fieldsArr[0].focus();


        },
        getDOMstrings: function() {
            return DOMstrings
        }
    }
})();

var controller = function(budgetCtrl, UICtrl) {

    var setupEventListerns = function() {
        document.querySelector('.add__btn').addEventListener('click', ctrlAdditem)

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                ctrlAdditem();
            }
        })
    }
    var DOM = UICtrl.getDOMstrings()
    var ctrlAdditem = function() {
        var input, newItem
        input = UICtrl.getinput();

        newItem = budgetCtrl.addItem(input.type, input.description, input.val)

        UICtrl.addListItem(newItem, input.type)

        UICtrl.clearFields()
    }

    return {
        init: function() {
            setupEventListerns()
        }

    }


}(budgetController, UIController);

controller.init()