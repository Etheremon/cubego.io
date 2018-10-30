export class LoadingScreen {
  constructor(renderingCanvas) {
    this._loadingDiv = null;
    this._loadingTextDiv = null;
    this._renderingCanvas = renderingCanvas;
    this._loadingText = "";
    this.isInLoading = false;
    this._resizeLoadingUI = this._resizeLoadingUI.bind(this);
  }

  displayLoadingUI() {
    this.isInLoading = true;
    if (this._loadingDiv) {
      return;
    }

    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "cubegoLoadingDiv";

    this._loadingTextDiv = document.createElement("div");
    this._loadingTextDiv.style.position = "absolute";
    this._loadingTextDiv.style.left = "0";
    this._loadingTextDiv.style.top = "40%";
    this._loadingTextDiv.style.marginTop = "80px";
    this._loadingTextDiv.style.width = "100%";
    this._loadingTextDiv.style.height = "20px";
    this._loadingTextDiv.style.fontFamily = "Arial";
    this._loadingTextDiv.style.fontSize = "14px";
    this._loadingTextDiv.style.color = "white";
    this._loadingTextDiv.style.textAlign = "center";
    this._loadingTextDiv.innerHTML = "Loading";
    this._loadingTextDiv.style.color = 'black';

    this._loadingDiv.appendChild(this._loadingTextDiv);

    this._loadingTextDiv.innerHTML = this._loadingText;

    let style = document.createElement('style');
    style.type = 'text/css';
    let keyFrames =
      `@-webkit-keyframes spin1 {\
                    0% { -webkit-transform: rotate(0deg);}
                    100% { -webkit-transform: rotate(360deg);}
                }\
                @keyframes spin1 {\
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }`;
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);

    let imgBack = new Image();
    imgBack.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGDGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHRpZmY6T3JpZW50YXRpb249IjEiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTI0VDE4OjQ2OjE5KzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMC0xOVQxNjo1NzozMiswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMC0xOVQxNjo1NzozMiswNzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMTU0MTFlNC0yMzYwLTM1NGEtOGY2ZC1kOTgyNDJjNWI4NTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplNjg1MzA0Yy1jMzM1LTY2NDctODY1Ni0yNTMzOWY4MWQ0YTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NzRjZWM2Mi0wZGMxLTViNDAtYmVhMS0zMWMzNzk2NWMzNjciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NzRjZWM2Mi0wZGMxLTViNDAtYmVhMS0zMWMzNzk2NWMzNjciIHN0RXZ0OndoZW49IjIwMTgtMTAtMTlUMTY6NTc6MzIrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQxNTQxMWU0LTIzNjAtMzU0YS04ZjZkLWQ5ODI0MmM1Yjg1OCIgc3RFdnQ6d2hlbj0iMjAxOC0xMC0xOVQxNjo1NzozMiswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Cc8DMAAAPd0lEQVRYhaWYWYxlV3WGv733Ge9cc1VXVbvnyY3TbjuOx5AAEZEsAlIkFKEkAok8oPAQJwIJXqI8JkQyOEqIIkBRQIkCQTERkZmEEzAGj2C3Tber3O6pqqura7rzGfaUh1tpuwhSlLB17zlP5+xPa531r38v4b3nytvfxdj+RRr1Jr4oEDgQCozFlwYRh/gsQ4QR4HESfOBQw2lYMQyOK5KGRpYgrMWjEFkGi4tsZTlqe5NWvYbP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";

    imgBack.style.position = "absolute";
    imgBack.style.left = "50%";
    imgBack.style.top = "50%";
    imgBack.style.marginLeft = "-20px";
    imgBack.style.marginTop = "-20px";
    imgBack.style.animation = "spin1 2s infinite ease-in-out";
    imgBack.style.webkitAnimation = "spin1 2s infinite ease-in-out";
    imgBack.style.transformOrigin = "50% 50%";
    imgBack.style.webkitTransformOrigin = "50% 50%";

    this._loadingDiv.appendChild(imgBack);

    this._resizeLoadingUI();

    window.addEventListener("resize", this._resizeLoadingUI);

    document.body.appendChild(this._loadingDiv);

    this._loadingDiv.style.opacity = "1";
  }

  hideLoadingUI() {
    this.isInLoading = false;

    if (!this._loadingDiv) {
      return;
    }

    setTimeout(() => {
      document.body.removeChild(this._loadingDiv);
      window.removeEventListener("resize", this._resizeLoadingUI);
    }, 2000);
  };

  forceHideLoadingUI() {
    this.isInLoading = false;
    if (!this._loadingDiv) {
      return;
    }

    document.body.removeChild(this._loadingDiv);
    window.removeEventListener("resize", this._resizeLoadingUI);
  }

  _resizeLoadingUI() {
    let canvasRect = this._renderingCanvas.getBoundingClientRect();
    let canvasPositioning = window.getComputedStyle(this._renderingCanvas).position;

    if (!this._loadingDiv) {
      return;
    }

    this._loadingDiv.style.position = (canvasPositioning === "fixed") ? "fixed" : "absolute";
    this._loadingDiv.style.left = canvasRect.left + "px";
    this._loadingDiv.style.top = canvasRect.top + "px";
    this._loadingDiv.style.width = canvasRect.width + "px";
    this._loadingDiv.style.height = canvasRect.height + "px";
  }
}
