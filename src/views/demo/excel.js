var SSF = {};
var basedate = new Date(1899, 11, 30, 0, 0, 0); // 2209161600000

export default {
  safe_decode_range(range) {
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    var idx = 0,
      i = 0,
      cc = 0;
    var len = range.length;
    for (idx = 0; i < len; ++i) {
      if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
      idx = 26 * idx + cc;
    }
    o.s.c = --idx;

    for (idx = 0; i < len; ++i) {
      if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
      idx = 10 * idx + cc;
    }
    o.s.r = --idx;

    if (i === len || range.charCodeAt(++i) === 58) {
      o.e.c = o.s.c;
      o.e.r = o.s.r;
      return o;
    }

    for (idx = 0; i != len; ++i) {
      if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
      idx = 26 * idx + cc;
    }
    o.e.c = --idx;

    for (idx = 0; i != len; ++i) {
      if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
      idx = 10 * idx + cc;
    }
    o.e.r = --idx;
    return o;
  },

  encode_row(row) {
    return "" + (row + 1);
  },
  encode_col(col) {
    if (col < 0) throw new Error("invalid column " + col);
    var s = "";
    for (++col; col; col = Math.floor((col - 1) / 26))
      s = String.fromCharCode(((col - 1) % 26) + 65) + s;
    return s;
  },

  format_cell(cell, v, o) {
    if (cell == null || cell.t == null || cell.t == "z") return "";
    if (cell.w !== undefined) return cell.w;
    if (cell.t == "d" && !cell.z && o && o.dateNF) cell.z = o.dateNF;
    if (v == undefined) return this.safe_format_cell(cell, cell.v);
    return this.safe_format_cell(cell, v);
  },

  safe_format_cell(cell, v) {
    var q = cell.t == "d" && v instanceof Date;
    if (cell.z != null)
      try {
        return (cell.w = SSF.format(cell.z, q ? this.datenum(v) : v));
      } catch (e) {}
    try {
      return (cell.w = SSF.format(
        (cell.XF || {}).numFmtId || (q ? 14 : 0),
        q ? this.datenum(v) : v
      ));
    } catch (e) {
      return "" + v;
    }
  },
  /**
   * @param {Number} num:	excel存储的数字
   * @param {String} format: 年月日的间隔符，默认为'-'
   * 格式化Excel表格中存储的时间
   */
  formatExcelDate(num, format = "-") {
    num = Number(num); // 强制类型转化，以防传来的值是字符串
    let millisecond = 0; // 转化后的毫秒数
    if (num > 60) {
      millisecond = (num - 25569) * 60 * 60 * 24 * 1000;
    } else {
      // 对小于61的错误日期进行处理
      millisecond = (num - 25568) * 60 * 60 * 24 * 1000;
    }
    let date = new Date(millisecond); // 根据转化后的毫秒数获取对应的时间
    let yy = date.getFullYear();
    let mm =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return yy + format + mm + format + dd; // 返回格式化后的日期
  },
  datenum(v, date1904) {
    var epoch = v.getTime();
    if (date1904) epoch -= 1462 * 24 * 60 * 60 * 1000;
    var dnthresh =
      basedate.getTime() +
      (v.getTimezoneOffset() - basedate.getTimezoneOffset()) * 60000;
    return (epoch - dnthresh) / (24 * 60 * 60 * 1000);
  },

  make_json_row(sheet, r, R, cols, header, hdr, dense, o) {
    var rr = this.encode_row(R);
    var defval = o.defval,
      raw = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw");
    var isempty = true;
    var row = header === 1 ? [] : {};
    if (header !== 1) {
      if (Object.defineProperty)
        try {
          Object.defineProperty(row, "__rowNum__", {
            value: R,
            enumerable: false,
          });
        } catch (e) {
          row.__rowNum__ = R;
        }
      else row.__rowNum__ = R;
    }
    if (!dense || sheet[R])
      for (var C = r.s.c; C <= r.e.c; ++C) {
        var val = dense ? sheet[R][C] : sheet[cols[C] + rr];
        if (val === undefined || val.t === undefined) {
          if (defval === undefined) continue;
          if (hdr[C] != null) {
            row[hdr[C]] = defval;
          }
          continue;
        }
        var v = val.v;
        switch (val.t) {
          case "z":
            if (v == null) break;
            continue;
          case "e":
            v = void 0;
            break;
          case "s":
          case "d":
          case "b":
            break;
          case "n":
            let isDateType;
            if (val.w.indexOf("-") !== -1 || val.w.indexOf("/") !== -1)
              isDateType = true;
            if (isDateType) v = this.formatExcelDate(val.v);

            break;
          default:
            throw new Error("unrecognized type " + val.t);
        }
        if (hdr[C] != null) {
          if (v == null) {
            if (defval !== undefined) row[hdr[C]] = defval;
            else if (raw && v === null) row[hdr[C]] = null;
            else continue;
          } else {
            row[hdr[C]] =
              raw || (o.rawNumbers && val.t == "n")
                ? v
                : this.format_cell(val, v, o);
          }
          if (v != null) isempty = false;
        }
      }
    return { row: row, isempty: isempty };
  },

  sheet_to_json(sheet, opts) {
    if (sheet == null || sheet["!ref"] == null) return [];
    var val = { t: "n", v: 0 },
      header = 0,
      offset = 1,
      hdr = [],
      v = 0,
      vv = "";
    var r = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
    var o = opts || {};
    var range = o.range != null ? o.range : sheet["!ref"];
    if (o.header === 1) header = 1;
    else if (o.header === "A") header = 2;
    else if (Array.isArray(o.header)) header = 3;
    else if (o.header == null) header = 0;
    switch (typeof range) {
      case "string":
        r = this.safe_decode_range(range);
        break;
      case "number":
        r = this.safe_decode_range(sheet["!ref"]);
        r.s.r = range;
        break;
      default:
        r = range;
    }
    if (header > 0) offset = 0;
    var rr = this.encode_row(r.s.r);
    var cols = [];
    var out = [];
    var outi = 0,
      counter = 0;
    var dense = Array.isArray(sheet);
    var R = r.s.r,
      C = 0,
      CC = 0;
    if (dense && !sheet[R]) sheet[R] = [];
    let arrs = sheet["!merges"];
    if (arrs) {
      const mergeRowMax = Math.max.apply(
        null,
        arrs.map((v) => v.e.r - v.s.r)
      );
      offset += mergeRowMax;
      let cccc = []; //获取合并行的所有单元格除去第一个
      const arrat = arrs.filter((v) => {
        return v.e.r - v.s.r > 0;
      });
      arrat.forEach((item, index) => {
        if (item.e.r - item.s.r === 1) {
          cccc.push(this.encode_col(item.e.c) + this.encode_row(item.e.r));
        } else {
          console.log(item.e.r - item.s.r);
          for (let indexI = item.s.r + 1; indexI <= item.e.r; indexI++) {
            cccc.push(this.encode_col(item.e.c) + this.encode_row(indexI));
          }
        }
      });
      if (mergeRowMax) {
        let newRR = rr;
        let newTitleArrs = [];
        for (let i = 0; i <= mergeRowMax; i++) {
          let newTitle = [];
          for (C = r.s.c; C <= r.e.c; ++C) {
            cols[C] = this.encode_col(C);
            val = dense ? sheet[R][C] : sheet[cols[C] + newRR];
            switch (header) {
              case 1:
                newTitle[C] = C - r.s.c;
                break;
              case 2:
                newTitle[C] = cols[C];
                break;
              case 3:
                newTitle[C] = o.header[C - r.s.c];
                break;
              default:
                if (val == null || val.h == "") {
                  val = { w: "__EMPTY", t: "s" };
                }
                vv = v = this.format_cell(val, null, o);
                counter = 0;
                for (CC = 0; CC < newTitle.length; ++CC) {
                  if (newTitle[CC] == vv) {
                    if (vv === "__EMPTY") vv = v + "_" + ++counter;
                  }
                }
                if (cccc.indexOf(cols[C] + newRR) !== -1) {
                  vv = "";
                }
                newTitle[C] = vv;
            }
            if (C == r.e.c) {
              newTitleArrs.push(newTitle);
            }
          }
          newRR++;
        }
        // console.log(newTitleArrs)
        for (let i1 = 0; i1 < newTitleArrs.length; i1++) {
          for (let i2 = 0; i2 < newTitleArrs[i1].length - 1; i2++) {
            if (newTitleArrs[i1][i2 + 1].indexOf("EMPTY") !== -1) {
              newTitleArrs[i1][i2 + 1] = newTitleArrs[i1][i2];
            }
          }
        }
        for (let j = 0; j < newTitleArrs[0].length; j++) {
          let obj = "";
          for (let i = 0; i < newTitleArrs.length; i++) {
            if (newTitleArrs[i][j]) {
              if (i) {
                obj = obj + "-" + newTitleArrs[i][j];
              } else {
                obj = obj + newTitleArrs[i][j];
              }
            }
          }
          hdr.push(obj);
        }
      }
    } else {
      for (C = r.s.c; C <= r.e.c; ++C) {
        cols[C] = this.encode_col(C);
        val = dense ? sheet[R][C] : sheet[cols[C] + rr];
        switch (header) {
          case 1:
            hdr[C] = C - r.s.c;
            break;
          case 2:
            hdr[C] = cols[C];
            break;
          case 3:
            hdr[C] = o.header[C - r.s.c];
            break;
          default:
            if (val == null) val = { w: "__EMPTY", t: "s" };
            vv = v = this.format_cell(val, null, o);
            counter = 0;
            for (CC = 0; CC < hdr.length; ++CC)
              if (hdr[CC] == vv) vv = v + "_" + ++counter;
            hdr[C] = vv;
        }
      }
    }
    // console.log(hdr);、、ly
    for (R = r.s.r + offset; R <= r.e.r; ++R) {
      var row = this.make_json_row(sheet, r, R, cols, header, hdr, dense, o);
      if (
        row.isempty === false ||
        (header === 1 ? o.blankrows !== false : !!o.blankrows)
      )
        out[outi++] = row.row;
    }
    out.length = outi;
    return out;
  },
};
