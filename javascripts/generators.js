var Generators = (function() {
	var Generators = {};
	function getRandomNumber(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}
	function ValueList() { this.list = []; }
	ValueList.fromArray = function(array) {
		if(!Array.isArray(array)) { throw new Error("Must be passed an array"); }
		var v = new ValueList();
		array.forEach(v.add.bind(v));
		return v;
	}
	ValueList.prototype.add = function(value) { this.list.push(value); return this; }
	ValueList.prototype.sample = function() {
		var index = getRandomNumber(0, this.list.length);
		return this.list[index];
	}

	function createData(name, description, values) {
		if(Array.isArray(values)) { values = ValueList.fromArray(values); }
		return {
			name: name,
			description: description,
			values: values
		};
	}

	/* ----- */

	function generate(data) {
		return {
			name: data.name,
			description: data.description,
			value: data.values.sample()
		};
	}

	var datas = {};
	Generators.add = function(name, description, values) {
		var data = createData(name, description, values);
		datas[data.name] = data;
	}

	Generators.generate = function(name) { return generate(datas[name]); }
	return Generators;
})();

Generators.add("Weapon", "", [ "Sword", "Mace/Club", "Polearm/Spear", "Axe", "Shield", "Dagger/Knives", "Fists", "Staff/Rod", "Bow/Musket", "Whip/Flail" ]);
Generators.add("Build", "", [ "Tall", "Short", "Petite", "Bulky", "Skinny", "Plump", "Athletic", "Muscular", "Top Heavy", "Bottom Heavy" ]);
Generators.add("Personality", "", [ "Perky", "Glum", "Serious", "Vain", "Cranky", "Honest", "Evil", "Mischievous", "Bashful", "Nervous" ]);
Generators.add("Culture", "", [ "Chinese", "Japanese", "English", "Celtic", "Roman", "Persian", "African", "Indian", "Spanish", "Egyptian", "South East Asian", "Russian", "Native American", "American", "Aboriginal", "Aztec" ]);
Generators.add("Animal", "", [ "Big Cat", "Bear", "Horse", "Snake", "Dog/Wolf", "Bull", "Boar", "Mammoth", "Dragon", "Rodent / Lagomorph", "Bird of Brey", "Insectoid / Arachnid", "Shark / Piscine" ]);

var el = document.querySelector(".generate");
var generators = el.dataset.generators.split(",").map(function(str) { return str.trim(); });
var template = el.querySelector(".template");

template.remove();

generators.forEach(function(generator) {
	console.log(generator);
	var data = Generators.generate(generator);
	var clone = template.cloneNode(true);

	clone.innerHTML = clone.innerHTML.replace("{name}", data.name).replace("{description", data.description).replace("{value}", data.value);
	el.appendChild(clone);
});

el.classList.remove("hidden");