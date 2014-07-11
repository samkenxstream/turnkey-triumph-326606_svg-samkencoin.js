// Define list of available attributes for stroke and fill
var sugar = {
  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset']
, fill:   ['color', 'opacity', 'rule']
, prefix: function(t, a) {
    return a == 'color' ? t : t + '-' + a
  }
}

/* Add sugar for fill and stroke */
;['fill', 'stroke'].forEach(function(m) {
  var i, extension = {}
  
  extension[m] = function(o) {
    if (typeof o == 'string' || SVG.Color.isRgb(o) || (o && typeof o.fill === 'function'))
      this.attr(m, o)

    else
      /* set all attributes from sugar.fill and sugar.stroke list */
      for (i = sugar[m].length - 1; i >= 0; i--)
        if (o[sugar[m][i]] != null)
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])
    
    return this
  }
  
  SVG.extend(SVG.Element, SVG.FX, extension)
  
})

SVG.extend(SVG.Element, SVG.FX, {
  // Rotation
  rotate: function(d, cx, cy) {
    return this.transform({ rotation: d, cx: cx, cy: cy })
  }
  // Skew
, skew: function(x, y) {
    return this.transform({ skewX: x, skewY: y })
  }
  // Scale
, scale: function(x, y, cx, cy) {
    return this.transform({ scaleX: x, scaleY: y, cx: cx, cy: cy })
  }
  // Translate
, translate: function(x, y) {
    return this.transform({ x: x, y: y })
  }
  // Matrix
, matrix: function(m) {
    return this.attr('transform', new SVG.Matrix(m))
  }
  // Opacity
, opacity: function(value) {
    return this.attr('opacity', value)
  }
})

SVG.extend(SVG.Rect, SVG.Ellipse, SVG.Circle, SVG.FX, {
  // Add x and y radius
  radius: function(x, y) {
    return this.rx(x).ry(y == null ? x : y)
  }
})

SVG.extend(SVG.Path, {
  // Get path length
  length: function() {
    return this.node.getTotalLength()
  }
  // Get point at length
, pointAt: function(length) {
    return this.node.getPointAtLength(length)
  }
})

SVG.extend(SVG.Parent, SVG.Text, SVG.FX, {
  // Set font 
  font: function(o) {
    for (var k in o)
      k == 'leading' ?
        this.leading(o[k]) :
      k == 'anchor' ?
        this.attr('text-anchor', o[k]) :
      k == 'size' || k == 'family' || k == 'weight' || k == 'stretch' || k == 'variant' || k == 'style' ?
        this.attr('font-'+ k, o[k]) :
        this.attr(k, o[k])
    
    return this
  }
})

