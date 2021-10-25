  /*page setting*/
        // 禁止右键菜单
        document.oncontextmenu = function (event) {
            event.preventDefault()
        };

        // 禁止橡皮筋效果
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, { passive: false });

        var startY, endY;
        //记录手指触摸的起点坐标
        document.querySelector('body').addEventListener('touchstart', function (e) {
            startY = e.touches[0].pageY;
        });
        document.querySelector('body').addEventListener('touchmove', function (e) {
            endY = e.touches[0].pageY;  //记录手指触摸的移动中的坐标
            //手指下滑，页面到达顶端不能继续下滑
            if (endY > startY && window.scrollTop() <= 0) {
                e.preventDefault();
            }
            //手指上滑，页面到达底部能继续上滑
            if (endY < startY && window.scrollY +
                window.innerHeight >= document.querySelector.scrollHeight) {
                e.preventDefault();
            }
        });

        //禁用页面前进后退
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
