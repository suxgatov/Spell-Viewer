const fs = require('fs');

var list = readFileSync('./assets/json/spells.json');

var filter = {
  "search": "",
  "school": "",
  "class": "",
  "level": "",
  "ritual": "",
  "concentration": "",
};

getMagics();

document.getElementById('search').onkeyup = value => {
  filter.search = document.getElementById('search').value;

  getMagics();
};
document.getElementById('school_search').onchange = value => {
  filter.school = document.getElementById('school_search').value;

  getMagics();
};
document.getElementById('class_search').onchange = value => {
  filter.class = document.getElementById('class_search').value;

  getMagics();
};
document.getElementById('level_search').onchange = value => {
  filter.level = document.getElementById('level_search').value;

  getMagics();
};
document.getElementById('ritual_search').onchange = value => {
  if (document.getElementById('ritual_search').checked) {
    filter.ritual = 'yes';
  } else {
    filter.ritual = '';
  }
  getMagics();
};
document.getElementById('concentration_search').onchange = value => {
  if (document.getElementById('concentration_search').checked) {
    filter.concentration = 'yes';
  } else {
    filter.concentration = '';
  }


  getMagics();
};


function select(id) {
  document.getElementById('spell_name').innerHTML = list[id].name;
  document.getElementById('sources').innerHTML = 'Sources: ' + list[id].page;
  let school = list[id].school;
  if (list[id].ritual === "yes") {
    school += " (Ritual)";
  }
  document.getElementById('school').innerHTML = school;
  document.getElementById('level').innerHTML = list[id].level;
  document.getElementById('cast_time').innerHTML = 'Cast Time: ' + list[id].casting_time;
  document.getElementById('range').innerHTML = 'Range: ' + list[id].range;
  document.getElementById('components').innerHTML = 'Components: ' + list[id].components;
  let duration = 'Duration: ';
  if (list[id].concentration === "yes") {
    duration += 'Concentration, ';
  };
  document.getElementById('duration').innerHTML = duration + list[id].duration;
  document.getElementById('desc').innerHTML = list[id].desc;
  document.getElementById('classes').innerHTML = list[id].class;
}

function getMagics() {
  document.getElementById('magics').innerHTML = '';
  let filtered = list;
  if (filter.school !== '') {
    filtered = filtered.filter(value => {
      if (value.school.toUpperCase().includes(filter.school.toUpperCase())) {
        return value;
      }
    });
  }

  if (filter.search !== '') {
    filtered = filtered.filter(value => {
      if (value.name.toUpperCase().includes(filter.search.toUpperCase())) {
        return value;
      }
    });
  }

  if (filter.class !== '') {
    filtered = filtered.filter(value => {
      if (value.class.toUpperCase().includes(filter.class.toUpperCase())) {
        return value;
      }
    });
  }

  if (filter.level !== '') {
    filtered = filtered.filter(value => {
      if (value.level.toUpperCase().includes(filter.level.toUpperCase())) {
        return value;
      }
    });
  }

  if (filter.ritual !== '') {
    filtered = filtered.filter(value => {
      if (value.ritual.toUpperCase().includes(filter.ritual.toUpperCase())) {
        return value;
      }
    });
  }

  if (filter.concentration !== '') {
    filtered = filtered.filter(value => {
      if (value.concentration.toUpperCase().includes(filter.concentration.toUpperCase())) {
        return value;
      }
    });
  }
  filtered.forEach(value => {
    listIt(value);
  })

  if (filtered.length) {
    try {
      const child = document.getElementById('magics').firstChild;
    if(child){
      child.classList.add("selected");
      select(child.id);
    }
    } catch (error) {
      console.log(error);
    }
  }

  //makeClick();
}

function spellClick(value) {
  let target = value.target;

  const id = target.id;

  if (!target.classList.contains("selected")) {
    var previous = document.getElementsByClassName("selected")[0];

  }

  target.classList.add("selected");

  if (previous !== undefined) {
    previous.classList.remove("selected");

  }

  select(id);
}

function listIt(value) {
  var node = document.createElement("li");
  node.classList.add("magicList");
  node.innerHTML = value.name;
  node.onclick = value => { spellClick(value) };
  node.id = list.indexOf(value);
  document.getElementById("magics").appendChild(node);
}

// Asynchronous read
function readFile(path) {
  fs.readFile(path, function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
  });
}

function readFileSync(path) {
  // Synchronous read
  var data = fs.readFileSync(path);
  return JSON.parse(data);
}

function saveFile(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}

async function readWriteAsync(path, content) {
  await fs.readFile(path, async function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);

    //add stuf with json["name"]

    await fs.writeFile(path, data, function (err) {
      if (err) throw err;
    });
  });
}

function readWriteSync(path, content) {
  var data = fs.readFileSync(path);
  data = JSON.parse(data);

  //add stuf with json["name"]

  fs.writeFileSync(path, data);

}