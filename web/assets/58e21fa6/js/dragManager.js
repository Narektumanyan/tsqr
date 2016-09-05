(function($) {
  $.fn.DragManager = function(options) {
    var settings = $.extend( {
      'drag'   : 'draggable', // drag elements classes
      'drop'   : '.graf', // drop zones classes
      'zIndex' : 9999
    }, options);

    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    var Manager = {};
    Manager.container = this;
    Manager.drag = {};
    Manager.drop = {};

    function onMouseDown(e) {

      if (e.which != 1 || $(e.target).hasClass('ui-resizable-handle')) return;

      var elem;
      if (Object.prototype.toString.call(options.drag) === '[object Array]') {
        for (var i = 0; i < options.drag.length; i++) {
          if (elem = e.target.closest('.' + options.drag[i])) break;
        };
      } else {
        elem = e.target.closest('.' + options.drag);
      }
      if (!elem) return;

      Manager.drag.elem = elem;

      Manager.drag.downX = e.pageX;
      Manager.drag.downY = e.pageY;

      return false;
    }

    function onMouseMove(e) {
      if (!Manager.drag.elem) return;

      if (!Manager.drag.avatar) {
        var moveX = e.pageX - Manager.drag.downX;
        var moveY = e.pageY - Manager.drag.downY;

        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }

        // начинаем перенос
        createAvatar(e); // создать аватар
        if (!Manager.drag.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
          Manager.drag = {};
          return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        var coords = getCoords(Manager.drag.elem);
        Manager.drag.shiftX = Manager.drag.downX - coords.left;
        Manager.drag.shiftY = Manager.drag.downY - coords.top;

        startDrag(e); // отобразить начало переноса
      }

      // отобразить перенос объекта при каждом движении мыши
      Manager.drag.avatar.style.left = e.pageX - Manager.drag.shiftX + 'px';
      Manager.drag.avatar.style.top = e.pageY - Manager.drag.shiftY + 'px';

      return false;
    }

    function onMouseUp(e) {
      if (Manager.drag.avatar) {
        finishDrag(e);
      }

      Manager.drag = {};
    }

    function finishDrag(e) {
      Manager.drop = findDroppable(e);

      if (!Manager.drop) {
        DragCancel();
      } else {
        DragEnd(e);
      }
    }

    function DragCancel() {
      $(Manager.drag.avatar).remove();
    }

    function DragEnd(event) {
      var insert = 'after',
          drop;

      if (Math.abs(event.pageY - getCoords(Manager.drop).top) < ($(Manager.drop).height()/2))
        insert = 'before';

      $(Manager.drag.avatar).remove();

      var previousNode = Manager.container.find('p[name="' + Manager.drag.elem.parentNode.getAttribute('name') + '"]');

      if (($(Manager.drag.elem).hasClass('sp') && $(Manager.drop).find('.sp').length == 0) || 
          !$(Manager.drag.elem).hasClass('sp')) {

        drop = document.createElement('p');
        drop.className = 'graf graf--p';
        drop.setAttribute('name', window.Dante.utils.generateUniqueName());
        if (insert == 'after')
          $(Manager.drop).after(drop);
        else
          $(Manager.drop).before(drop);

        Manager.drop = drop;
      } else {
        if (Math.abs(event.pageX - getCoords(Manager.drop).left) < ($(Manager.drop).width()/2))
          insert = 'before';
        else
          insert = 'after';
      }

      if (insert == 'after')
        $(Manager.drop).append(Manager.drag.elem);
      else
        $(Manager.drop).prepend(Manager.drag.elem);

      if (previousNode.children().length == 0)
        $(previousNode).remove();
    }

    function createAvatar(e) {
      Manager.drag.avatar = document.createElement('div');
      Manager.drag.avatar.className = 'droppable-element-avatar';

      Manager.drag.avatar.rollback = function() {

      };
    }

    function startDrag(e) {
      document.body.appendChild(Manager.drag.avatar);

      Manager.drag.avatar.style.zIndex = options.zIndex;
      Manager.drag.avatar.style.position = 'absolute';
      Manager.drag.avatar.style.height = $(Manager.drag.elem).height() + 'px';
      Manager.drag.avatar.style.width = $(Manager.drag.elem).width() + 'px';
    }

    function findDroppable(event) {
      $(Manager.drag.avatar).hide();

      // получить самый вложенный элемент под курсором мыши
      var elem = document.elementFromPoint(event.clientX, event.clientY);

      $(Manager.drag.avatar).show();

      if (elem == null) {
        // такое возможно, если курсор мыши "вылетел" за границу окна
        return null;
      }

      return elem.closest('.graf');
    }


    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }

    return this;
  };
})(jQuery);