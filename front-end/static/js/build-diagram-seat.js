

  // Start color lib
    const isNumberAndInRange = (input, mix, max) => {
      return typeof value === 'number' && value >= min && value <= max;
    };

    const formatNumber = (number, format) => {
      if (format === 10) {
        return number;
      }
      else if (format === 16) {
        let output = Math.round(number).toString(16);
        if (output.length === 1) output = `0${output}`;
        return output;
      }
      else if (format === 'percent') {
        return Math.round(number / 255 * 1000) / 1000;
      }
      else {
        throw new Error('Format is invalid.');
      }
    };

    const parseRGBA = (color) => {
      let r, g, b, a = 1;

      if (typeof color === 'string' && color.match(/^rgb\(\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i)) {
        const matches = color.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)
        r = matches[1];
        g = matches[2];
        b = matches[3];
      }
      else if (typeof color === 'string' && color.match(/^rgba\(\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0\.\d+)\s*\)$/i)) {
        const matches = color.match(/rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0|1|0\.\d+)\s*\)/i)
        r = matches[1];
        g = matches[2];
        b = matches[3];
        a = matches[4];
      }

      if (r === undefined || g === undefined || b === undefined || a === undefined) {
        throw new Error('Not a rgba string.');
        return;
      }

      r = parseInt(r, 10);
      g = parseInt(g, 10);
      b = parseInt(b, 10);
      a = parseFloat(a) * 255;

      return {
        red   : r,
        green : g,
        blue  : b,
        alpha : a
      }
    };

    const parseHex = (color) => {
      if (!color.match(/^#([0-9a-f]{6}|[0-9a-f]{8})$/i)) {
        throw new Error('Not a hex string.');
        return;
      }

      color = color.replace(/^#/, '');

      const convert = (single) => {
        return parseInt(single, 16);
      };

      const r = convert(color.substr(0, 2));
      const g = convert(color.substr(2, 2));
      const b = convert(color.substr(4, 2));
      const a = convert(color.substr(6, 2) || 'FF');

      return {
        red   : r,
        green : g,
        blue  : b,
        alpha : a
      }
    };

    class Color {

      constructor (color) {
        this.channel = undefined;

        if (! this.channel) {
          try { this.channel = parseHex(color); } catch (e) {}
        }
        if (! this.channel) {
          try { this.channel = parseRGBA(color); } catch (e) {}
        }

        if (! this.channel) {
          throw new Error("Can't parse color.");
        }
      }

      setRed (value) {
        if (!isNumberAndInRange(value, 0, 255)) {
          throw new Error('Please pass in a number between 0 ~ 255.');
        }

        this.channel.red = parseInt(value, 10);
      }

      setGreen (value) {
        if (!isNumberAndInRange(value, 0, 255)) {
          throw new Error('Please pass in a number between 0 ~ 255.');
        }

        this.channel.green = parseInt(value, 10);
      }

      setBlue (value) {
        if (!isNumberAndInRange(value, 0, 255)) {
          throw new Error('Please pass in a number between 0 ~ 255.');
        }

        this.channel.blue = parseInt(value, 10);
      }

      setAlpha (value) {
        if (!isNumberAndInRange(value, 0, 1)) {
          throw new Error('Please pass in a number between 0 ~ 1.');
        }

        this.channel.alpha = parseInt(value * 255, 10);
      }

      getRed (format=10) {
        return formatNumber(this.channel.red, format);
      }

      getGreen (format=10) {
        return formatNumber(this.channel.green, format);
      }

      getBlue (format=10) {
        return formatNumber(this.channel.blue, format);
      }

      getAlpha (format='percent') {
        return formatNumber(this.channel.alpha, format);
      }

      toFormat (format) {
        if (! typeof format === 'string') {
          throw new Error('Format must be a string.');
          return;
        }

        return format
          .replace(/\$r/i, this.getRed())
          .replace(/\$g/i, this.getGreen())
          .replace(/\$b/i, this.getBlue())
          .replace(/\$a/i, this.getAlpha())
          .replace(/\$0xR/, this.getRed(16).toUpperCase())
          .replace(/\$0xr/, this.getRed(16).toLowerCase())
          .replace(/\$0xG/, this.getGreen(16).toUpperCase())
          .replace(/\$0xg/, this.getGreen(16).toLowerCase())
          .replace(/\$0xB/, this.getBlue(16).toUpperCase())
          .replace(/\$0xb/, this.getBlue(16).toLowerCase())
          .replace(/\$0xA/, this.getAlpha(16).toUpperCase())
          .replace(/\$0xa/, this.getAlpha(16).toLowerCase());
      }

      toRGB () {
        return this.toFormat('rgb($r, $g, $b)');
      }

      toRGBA () {
        return this.toFormat('rgba($r, $g, $b, $a)');
      }

      toHex () {
        return this.toFormat('#$0xR$0xG$0xB');
      }

      toHexA () {
        return this.toFormat('#$0xR$0xG$0xB$0xA');
      }

    }
    //end Color lib
    var matrix = {};

    const configPanzoom = {
        fit: false,
        center: true,
        minZoom: 1,
        maxZoom: 5.5,
        zoomScaleSensitivity: 0.5,
        controlIconsEnabled: false,
        contain: true,
    };

    /**
     * default seat
     */
    const seat = {
        id: 0,
        x: 0,
        y: 0,
        status: "available",
        color: {
            available: "#ffffff",
            unavailable: "#D1D1D1",
            selected: "#00008D",
        },
        angle: 0,
        size: 9,
        border: {
            width: 1.5,
            color: {
                available: "#000000",
                unavailable: "#8080FF",
                selected: "#000000",
            },
        },
        number: {
            key: "1",
            size: 7,
            x: 3,
            y: 8,
            color: {
                available: "#000000",
                unavailable: "#fafa11",
                selected: "#ffffff",
            },
        },
        seat_nm : '',
        seat_type_nm : '',
        seat_type_no : 0
    };
    var panZoomInstance ;
    /**
     * template html for seat
     * @param seat
     * @returns {string}
     */
    function templateRect(seat) {

        seat.color = {
          available: new Color(seat.color.available).toRGBA(),
          selected: new Color(seat.color.selected).toRGBA(),
          unavailable: new Color(seat.color.unavailable).toRGBA(),
        };
        seat.border.color = {
          available: new Color(seat.border.color.available).toRGB(),
          selected: new Color(seat.border.color.selected).toRGB(),
          unavailable: new Color(seat.border.color.unavailable).toRGB(),
        };
        // console.log(seat);
        let className = 'designate-seat';
        if(seat.seat_type_kb == 2){
          className = 'free-seat';
        }
        return '<g data-id="' + seat.id + '">' +
            '<rect x="' + seat.x + '" y="' + seat.y + '" ' +
            'width="' + seat.size + '" height="' + seat.size + '" ' +
            'stroke="' + seat.border.color[seat.status] + '" ' + 'stroke-width="' + seat.border.width + '" ' +
            'fill="' + seat.color[seat.status] + '" ' +
            'transform="rotate(' + -seat.angle + ", " + (seat.x) + ", " + (seat.y) + ')" ' +
            'data-seat_no="'+ seat.number.key + '" ' +
            'class="'+ className + '">' +
            '</rect>' +
            '<text alignment-baseline="middle" text-anchor="middle"' +
            'x="' + (seat.x + seat.size / 2) + '" y="' + (seat.y + seat.size / 2) + '" ' +
            'font-family="" ' + 'font-size="' + seat.number.size + '" ' +
            'fill="' + seat.number.color[seat.status] + '" ' +
            'style="cursor: default;" ' +
            '>' +
            seat.number.key +
            '</text>' +
            '</g>';
    }

    /**
     * template for graphic (g)
     * @param image
     * @param matrix
     * @returns {string}
     */
    function templateGraphic(image, matrix) {
        return '<svg id="diagram" width="628" height="535" version="1.1"><g fill="black" stroke="black" id="map-bg" transform="matrix(1, 0, 0, 1, 0, 0)"> ' +
            image +
            matrix +
            '</g></svg>';
    }

    function buildMapMatrix(seatList){
        let matrixDiagram = '';
        matrix.map(function (seat_info, key) {
            let seat_tmp = Object.assign([], seat);
            // console.log(seat_info);
            seat_tmp.number.key = seat_info.seat_no;
            Object.keys(sample).map(function (sample_key) {
                if (sample_key == 'status') {
                    // if seat have sale flag and seat designated
                    if (seat_info[sample[sample_key]] == 1 && seat_info['seat_type_kb'] == 1) {
                        seat_tmp[sample_key] = 'available';
                    } else {
                        seat_tmp[sample_key] = 'unavailable';
                    }

                } else if (sample_key == 'color') {
                    seat_tmp[sample_key] = {
                        available: seat_info[sample[sample_key]],
                        selected: seat.color.selected,
                        unavailable: seat.color.unavailable,
                    };
                    seat_tmp.border.color = {
                        available: seat.border.color.available,
                        selected: seat.border.color.selected,
                        unavailable: seat_info[sample[sample_key]],
                    };
                } else {
                    seat_tmp[sample_key] = seat_info[sample[sample_key]];
                }
            })
            seat_tmp.id = key;
            seatList.push(seat_tmp);
            matrixDiagram += templateRect(seat_tmp);
        })
        return matrixDiagram;
    }

    /**
     * add event to seat
     */
    function event(seatList) {

        $(document).on('click', 'rect,text', function () {
            let id = $(this).parent().attr('data-id');
            if (seatList[id].status == 'available') {
                $(this).parent().children('rect').attr('fill', seatList[id].color.selected);
                // $(this).parent().children('rect').attr('stroke', seatList[id].color.available);
                seatList[id].status = 'selected';
            } else if (seatList[id].status == 'selected') {
                $(this).parent().children('rect').attr('fill', seatList[id].color.available);
                // $(this).parent().children('rect').attr('stroke', seatList[id].border.color.available);
                seatList[id].status = 'available';
            }
            $('#select-seat').val(JSON.stringify(getAllSelectedSeat(seatList) )).trigger("change");
          // localStorage.setItem('selectSeat', JSON.stringify(getAllSelectedSeat(seatList) ));
        });
        // $(document).on('click', 'text', function () {
        //     $(this).parent().children('rect').click();
        // });
        // message in click on free seat
        $(document).on('click', '.free-seat', function () {

          alert('枚数選択をしてください。');
        });

        $(document).on('load-select-seat',function () {
          let selectedSeat = JSON.parse($('#select-seat').val());
          selectedSeat.forEach(function (itemSeat) {
            changeStatusSeat(seatList,itemSeat.seat_no,'selected');
          });

        });
        $(document).on('click', '.btn-cancel-all', function () {
          let confirmBox = confirm("ホントに？");
          if(confirmBox==true ) {
            removeAllSelectedSeat(seatList);
            $('#select-seat').val(JSON.stringify(getAllSelectedSeat(seatList))).trigger("change");
          }
        });

        $(document).on('click', '.btn-cancel', function (event) {

          var seatNo = 0 ;
          seatNo = $(event.target).attr('data-seat_no');

          let confirmBox = confirm("ホントに？");
          if(confirmBox==true ) {

            changeStatusSeat(seatList, seatNo, 'available');
            $(this).attr('fill', seatList[seatNo].color.available);
            $(this).attr('stroke', seatList[seatNo].border.color.available);
            $('#select-seat').val(JSON.stringify(getAllSelectedSeat(seatList))).trigger("change");
          }
        });
        $('#panzoom-in').click(function () {

            panZoomInstance.zoomIn();
        });
        $('#panzoom-out').click(function () {
            panZoomInstance.zoomOut();
        });
        $('#panzoom-reset').click(function () {
            panZoomInstance.reset();
        });
      $('#get-seat').click(function () {
        changeStatusSeat(seatList,7,'selected');
        console.log(JSON.stringify(getAllSelectedSeat(seatList) ));

      });

    }

    /**
     * get seat no
     * @param idSeat
     * @returns {*}
     */
    function getSeatNo(idSeat) {
        return matrix[idSeat].seat_nm;
    }

    /**
     * get all selected seat
     * @param seatList
     * @returns {{seat_no: *, status: string}[]}
     */
    function getAllSelectedSeat(seatList) {

        let selectedSeats = matrix.map(function (seat) {

            return {seat_no: seat.seat_no ,
                    seat_nm : seat.seat_nm ,
                    seat_type_no :seat.seat_type_no,
                    seat_type_nm :seat.seat_type_nm
            };
        }).filter(function (seat, index) {
            return seatList[index].status == 'selected';
        });
        return selectedSeats;
    }

    /**
     * remove all selection in seat
     * @param seatList
     */
    function removeAllSelectedSeat(seatList) {
        seatList.map(function (seat, index) {
            if (seat.status == 'selected') {
                seat.status = 'available';
                $('g[data-id=' + index + ']').children('rect').attr('fill', seat.color.available);
                $('g[data-id=' + index + ']').children('rect').attr('stroke', seat.border.color.available);
            }
        });
    }

    /**
     * change status of seat
     * @param seatList
     * @param seatNo
     * @param status ('available', 'selected')
     */
    function changeStatusSeat(seatList, seatNo, status) {
        if (status != 'available' && status != 'selected') return;

        seatList.map(function (seat, index) {
            let checkSeatNo;
            if (Array.isArray(seatNo)) {
                checkSeatNo = seatNo.some(function (item) {
                    return item == matrix[index].seat_no;
                })
            } else {
                checkSeatNo = matrix[index].seat_no == seatNo;
            }
            if (checkSeatNo && seat.status != 'unavailable') {
                seat.status = status;
                $('g[data-id=' + index + ']').children('rect').attr('fill', seat.color[status]);
                $('g[data-id=' + index + ']').children('rect').attr('stroke', seat.border.color[status]);

            }
        })
    }

    /**
     * define attribute custom seat
     * @type {{x: string, y: string, angle: string}}
     */
    let sample = {
        x: "x_zahyo",
        y: "y_zahyo",
        angle: "angle",
        status: "sales_seat_flg",
        size: "seat_size",
        color: "seat_type_color",
        seat_nm: "seat_nm",
        seat_type_nm: "seat_type_nm",
        seat_type_no: "seat_type_no",
        seat_type_kb: "seat_type_kb",

    }

    function buildPanZoomInstance(configPanzoom) {

        if (!$('#diagram').find('#map-bg')) {
        setTimeout(function(){buildPanZoomInstance(configPanzoom);}, 300);
        } else {

             panZoomInstance = svgPanZoom('#diagram', configPanzoom);
        }

    };

    /**
     * build theatre
     * @param matrix (seats)
     * @param img (background)
     */
    function buildDiagram(matrix, img) {
        // let diagram = $('svg');
        let diagram = $('#diagram_wrap');
        let seatList = [];

        let matrixDiagram = buildMapMatrix(seatList);
        var customPan = {};
        /**
         * Dom svg
         * @type {HTMLImageElement}
         */
        let realImage = new Image();
        realImage.src = img.src;
        realImage.onload = function () {
            let width = realImage.naturalWidth;
            let height = realImage.naturalHeight;
            // diagram.width(width);
            // diagram.height(height);

            let image = '<image preserveAspectRatio="xMinYMin slice" x="0" y="0" width="' + width + '" height="' + (height + 10) + '" xlink:href="' + img.src + '"></image>';

            /**
             * config limit pan
             */
            var beforePan = function (oldPan, newPan) {
                let width = $('.panzoom').width();
                let height = $('.panzoom').height();
                var sizes = this.getSizes()
                    , gutterWidth = sizes.viewBox.width
                    , gutterHeight = sizes.viewBox.height;
                // Computed variables

                customPan = {};
                if (width < gutterWidth) {
                    gutterWidth = width
                }
                if (height < gutterHeight) {
                    gutterHeight = height
                }
                let leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
                    , rightLimit = sizes.width - sizes.viewBox.width - (sizes.viewBox.x * sizes.realZoom)
                    , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
                    , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
                customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x)) ;
                customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));
                return customPan;
            };

            /**
             * config panzoom
             */
            configPanzoom.beforePan = beforePan;
          $(function () {
              setTimeout(function(){buildPanZoomInstance( configPanzoom);}, 1000);

          });


            diagram.html(templateGraphic(image, matrixDiagram));
        }
        // console.log(seatList);
        event(seatList);

    }

    // buildDiagram(matrix, {
    //     src: '../img/hall_pic.png'
    // });
function initDiagram(srcImage ="",matrixApi = {}) {
  matrix = matrixApi;

  buildDiagram(matrix, {
        src: srcImage
    });

}

function getSeatList(){
    // this.$store.dispatch("post/increment");
//    return seatList
}

export default {buildDiagram ,initDiagram ,changeStatusSeat ,removeAllSelectedSeat, getAllSelectedSeat ,getSeatNo,getSeatList}


