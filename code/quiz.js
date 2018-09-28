var timerFunction;


//현재 로그인 상태를 감지해서 로그인이 되었으면 화면에 띄우고 아니면 경고창 띄우는 함수 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	document.getElementById("log-button").innerHTML = user.email+"님 환영합니다.";
    	document.getElementById("log-button").style.color= "rgb(233,65,103)";
    }
  });

  var storage = firebase.storage();
  var storageRef = firebase.storage().ref();

    storageRef.child('Language/Java/01.png').getDownloadURL().then(function(url) {

        // `url` is the download URL for 'images/stars.jpg'
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        // var img = document.getElementById('myimg');
        // img.src = url;
        console.log(url);
      })
  // Insert url into an <img> tag to "download"
.catch(function(error) {
  switch (error.code) {
    case 'storage/object_not_found':
      console.log(" File doesn't exist")
      break;
    case 'storage':
    console.log("User doesn't have permission to access the object")
      // 
      break;
    case 'storage/canceled':
    console.log("User canceled the upload")
      // 
      break;
    case 'storage/unknown':
    console.log("Unknown error occurred, inspect the server response")
      // 
      break;
  }
}); 


var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (image, gridSize) {
        this.setImage(image, gridSize);
        $('#playPanel').show();
        $('#sortable').randomize();
        this.enableSwapping('#sortable li');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        $('#timerPanel').text(elapsedTime);
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
                if (isSorted(currentList))
                    $('#actualImageBox').empty().html($('#gameOver').html());
                else {
                    var now = new Date().getTime();
                    imagePuzzle.stepCount++;
                    $('.stepCount').text(imagePuzzle.stepCount);
                    $('.timeCount').text(parseInt((now - imagePuzzle.startTime) / 1000, 10));
                }

                imagePuzzle.enableSwapping(this);
                imagePuzzle.enableSwapping($dragElem);
            }
        });
    },

    setImage: function (image, gridSize) {
        gridSize = gridSize || 4; // If gridSize is null or not passed, default it as 4.
        var percentage = 100 / (gridSize - 1);
        $('#imgTitle').html("testing");
        $('#actualImage').attr('src', image.src);
        $('#sortable').empty();
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image.src + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': 400 / gridSize,
                'height': 400 / gridSize
            });
            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}

$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};
