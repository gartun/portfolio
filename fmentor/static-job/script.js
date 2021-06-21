window.onload = function() {
  var section = document.getElementsByClassName('chosen-tablets')[0];
  
  var tabWrapper = document.getElementsByClassName('tablet-wrapper')[0];
  
  var clrBtn = document.getElementsByClassName('clear')[0];

  var cards = [].slice.call(document.getElementsByClassName('card'));
  
  // bütün tablet sınıfını topla
  // ve arraye çevir.
  var tablets = [].slice.call(document.getElementsByClassName('tablet'));
  
  var chosenTablets = [];
  
  clrBtn.addEventListener('click', function() {
    var spans = [].slice.call(tabWrapper.getElementsByClassName('parent-span'));
    
    for(var i = 0; i < spans.length; i++) {
      tabWrapper.removeChild(spans[i]);
      
      chosenTablets.splice(0);
      filterIt();
    }
    
    // seçilen tablet arrayini resetle
    chosenTablets.splice(0);
    
    // chosen-tablets div'ini görünmez yap
    section.classList.remove('d-flex');
  });
  
  /* 
  Sayfadaki tabletlere event listener
  ekleme ve fn yaratma bölümü - Başlangıç
  */
  for(var _i = 0; _i < tablets.length; _i++) {
    var el = tablets[_i];
    
    el.addEventListener('click', function() {
      addToTablets(this.innerText);
    })
  }
  
  function addToTablets(keyword) {
    // halihazırda mevcutsa fndan çık
    if(chosenTablets.indexOf(keyword) > -1) return;
    
    chosenTablets.push(keyword);
    
    // chosen-tablets div'ini görünür yap
    section.classList.add('d-flex');
    
    // yeni üyeyi sayfada göster
    displayChosenTablets('added');
    
    filterIt();
  }
  
  function displayChosenTablets(status, ind) {
    if(status === 'added') {
      var len = chosenTablets.length;
      var _i = '';
      if(len > 0) {
        _i = chosenTablets[len - 1];
      } else {
        _i = chosenTablets[0];
      }
      
      var parentSpan = document.createElement('span');
      parentSpan.className = 'parent-span';
      
      var valueSpan = document.createElement('span');
      
      var remSpan = document.createElement('span');
      
      remSpan.addEventListener('click', function() {
        var val = this.previousSibling.innerText;

        removeFromTablets(val);
      });
      
      var val = document.createTextNode(_i);
      
      var remVal = document.createTextNode('×');
      
      valueSpan.className = 'chosen-tablet tablet';
      remSpan.className = 'remove';
      
      valueSpan.appendChild(val);
      remSpan.appendChild(remVal);
      parentSpan.appendChild(valueSpan);
      parentSpan.appendChild(remSpan);
      
      tabWrapper.appendChild(parentSpan);
      
    } else {
      var theEl = tabWrapper.children[ind];
      
      tabWrapper.removeChild(theEl);
      
      if(tabWrapper.childElementCount === 0) {
        section.classList.remove('d-flex');
      }
    }
  }
  
  /*
  Sayfadaki tabletlere event listener
  ekleme ve fn yaratma bölümü - Bitiş
  */
  
  function removeFromTablets(keyword) {
    var ind = chosenTablets.indexOf(keyword);
    
    if(ind === -1) return;
    
    chosenTablets.splice(ind, 1);
    displayChosenTablets('removed', ind);
    filterIt();
  }
  
  /*
  ######### filter results #########
  */
  function filterIt() {
    for(var i = 0; i < cards.length; i++) {
      var card = cards[i];
      
      var cardTablets = [].slice.call(card.getElementsByClassName('tablet'));
      
      var vals = [];
      for(var y = 0; y < cardTablets.length; y++) {
        
        vals.push(cardTablets[y].innerText);
        
      }
      var allIncluded = false;
      var existing = [];
      
      for(var j = 0; j < chosenTablets.length; j++) {
        var choVal = chosenTablets[j];
        
        var ind = vals.indexOf(choVal);
        if(ind === -1) break;
        
        existing.push(choVal);
      }
      
      if(existing.length === chosenTablets.length) {
        allIncluded = true;
      } else {
        allIncluded = false;
      }
      
      if(!allIncluded) {
        card.classList.add('d-none');
      } else {
        card.classList.remove('d-none');
      }
    }
  }
  
  /*
  ####### Güncelleri işaretle #######
  */
  var whens = [].slice.call(document.getElementsByClassName('when'));
  
  for(var i = 0; i < whens.length; i++) {
    if(/1d|today/i.test(whens[i].innerText)) {
      var card = whens[i].parentElement.parentElement.parentElement;
      
      card.classList.add('recent');
    }
  }
}