class BarMaker {
    constructor(initialState) {
        this.state = {
            linearValues: true,
            valueMax: 850,
            valueMin: 300,
            bar: {
                height: 50,
            },
            valuesBar: {
                height: 10
            },
            segments: [],
            tooltip: {
                form: {
                    state: "edit",
                    element: null,
                    colorInput: null,
                    textInput: null,
                    removeButton: null,
                    closeTooltipButton: null
                },
                open: false,
                element: null
            },
            parentID: ""
        }
        this.valueSegments = []
        this.selectedDivider = null
        this.leftWidth = 0
        this.rightWidth = 0
        this.bindHandlers = this.bindHandlers.bind(this)
        this.bindHandlers()
        this.initBar(initialState);
        this.initTooltip()
        this.initToggleLinear()
        this.initValuesBar()
        this.initPrintable()
    }

    initBar(initialState = {}) {
        if (!initialState.segments || initialState.segements.length === 0) {
            initialState.segments = [
                {
                    valueBegin: null,
                    valueEnd: null,
                    backgroundColor: "#ffff00",
                    width: (1 / 3) * 100,
                    height: `${this.state.bar.height}px`,
                    innerText: "left",
                    left: null,
                    right: null,
                    element: null
                },
                {
                    valueBegin: null,
                    valueEnd: null,
                    backgroundColor: "#FFC0CB",
                    width: (1 / 3) * 100,
                    height: `${this.state.bar.height}px`,
                    innerText: "middle",
                    left: null,
                    right: null,
                    element: null
                },
                {
                    valueBegin: null,
                    valueEnd: null,
                    backgroundColor: "#add8e6",
                    width: (1 / 3) * 100,
                    height: `${this.state.bar.height}px`,
                    innerText: "right",
                    left: null,
                    right: null,
                    element: null
                }
            ]
        }
        if (!initialState.parentID) {
            initialState.parentID = "bar-parent"
        }
        this.state = { ...this.state, ...initialState }

        this.parent = document.querySelector(`#${this.state.parentID}`)
        this.bar = document.createElement('div')
        this.bar.style.display = "flex"
        this.bar.style.height = `${this.state.bar.height}px`
        this.bar.style.position = "relative"
        this.drawBar()
        this.distributeLinearValues()
        this.parent.appendChild(this.bar)
    }

    drawBar() {
        for (let i = 0; i < this.state.segments.length; i++) {
            const segmentDiv = document.createElement("div")
            const { backgroundColor, width, display, height, innerText } = this.state.segments[i]
            segmentDiv.style.backgroundColor = backgroundColor
            segmentDiv.style.width = `${width}%`
            segmentDiv.style.height = height
            // segmentDiv.style.display = display
            segmentDiv.style.resize = "none"
            segmentDiv.innerText = innerText
            segmentDiv.setAttribute('draggable', 'true')
            segmentDiv.addEventListener('click', this.segmentClickHandler)
            segmentDiv.addEventListener('dragstart', this.segmentDragstartHandler)
            segmentDiv.addEventListener('dragenter', this.segmentDragentertHandler)
            segmentDiv.addEventListener('dragover', (e) => e.preventDefault())
            segmentDiv.addEventListener('dragleave', this.segmentDragleaveHandler)
            segmentDiv.addEventListener('dragend', this.segmentDragendHandler)
            segmentDiv.addEventListener('drop', this.segmentDropHandler)
            this.bar.appendChild(segmentDiv)
            this.state.segments[i].element = segmentDiv

            // If not the last segment, create divider, attach it as segment.right, make 
            // divider.left a reference to segment in state
            if (i !== this.state.segments.length - 1) {
                const dividerDiv = document.createElement('div')
                dividerDiv.style.backgroundColor = "black"
                dividerDiv.style.width = "0"
                dividerDiv.style.position = "relative"
                // The divider is a parent div with 0 width and relative pisition. It's
                // child is the actual visible divider with width 2px and position absolute
                // This allows us not to worry about divider width when calculating segment width
                const dividerChild = document.createElement('div')
                dividerChild.style.position = 'absolute'
                dividerChild.style.left = "-1px"
                dividerChild.style.width = "2px"
                dividerChild.style.backgroundColor = "black"
                dividerChild.style.height = `${this.state.bar.height}px`
                dividerDiv.appendChild(dividerChild)
                dividerChild.style.cursor = "ew-resize";
                dividerDiv.left = this.state.segments[i]
                this.state.segments[i].right = dividerDiv
                segmentDiv.insertAdjacentElement("afterend", dividerDiv)
                dividerChild.addEventListener("mousedown", this.dividerMousedownHandler)
            }

            // If not first segment, reference the right divider of last segment,
            // attach is segment.left, and reference current segment as divider.right
            if (i !== 0) {
                const dividerDiv = this.state.segments[i - 1].right
                this.state.segments[i].left = dividerDiv
                dividerDiv.right = this.state.segments[i]
            }
        }
    }

    // Removes the segments and dividers from the DOM, but does not affect state
    clearBar() {
        if (this.state.segments.length !== 0) {
            this.state.segments.forEach(seg => {
                seg.element.remove()
                seg.right && seg.right.remove()
            })
        }
    }

    clearValuesBar() {
        if (this.valueSegments.length !== 0) {
            this.valueSegments.forEach(seg => {
                seg.remove()
                seg.right && seg.right.remove()
            })
            this.valueSegments = []
        }
    }

    distributeLinearValues() {
        const normalizedRange = this.state.valueMax - this.state.valueMin
        if (this.state.linearValues) {
            for (let i = 0; i < this.state.segments.length; i++) {
                const totalPercent = this.getTotalWidthPercent(i)
                this.state.segments[i].valueBegin = ((totalPercent / 100) * normalizedRange) + this.state.valueMin
                if (i === this.state.segments.length - 1) {
                    this.state.segments[i].valueEnd = this.state.valueMax
                } else {
                    this.state.segments[i].valueEnd = ((totalPercent + this.state.segments[i].width) / 100 * normalizedRange) + this.state.valueMin
                }
            }
        }
    }

    distributeCustomValues() {
        const normalizedRange = this.state.valueMax - this.state.valueMin
        console.log(this.state.segments, this.valueSegments)
        if (!this.state.linearValues) {
            if (this.state.segments.length === this.valueSegments.length) {
                // figure this shit out
                for (let i = 0; i < this.state.segments.length; i++) {
                    // A get total percent up to value segment
                    const totalPercent = this.getTotalWidthPercentValues(i) / 100
                    const totalValueSoFar = totalPercent * normalizedRange
                    const width = parseFloat(this.valueSegments[i].style.width) / 100
                    const valueChunk = width * normalizedRange
                    this.state.segments[i].valueBegin = totalValueSoFar + this.state.valueMin
                    if (i === this.state.segments.length - 1) {
                        this.state.segments[i].valueEnd = this.state.valueMax
                    } else {
                        this.state.segments[i].valueEnd = totalValueSoFar + valueChunk + this.state.valueMin
                    }
                }
            } else {
                console.log('Please linearize value ranges')
            }
        }
    }


    // *************************** ValuesBar Handlers *************************** \\

    initValuesBar() {
        this.valuesParent = document.querySelector(`#values-bar-parent`)
        this.valuesBar = document.createElement('div')
        this.valuesBar.style.display = "flex"
        this.valuesBar.style.height = `${this.state.valuesBar.height}px`
        this.valuesBar.style.position = "relative"
        this.drawValuesBar()
        this.valuesParent.appendChild(this.valuesBar)
    }

    drawValuesBar() {
        for (let i = 0; i < this.state.segments.length; i++) {
            const segmentDiv = document.createElement("div")
            const { valueBegin, valueEnd, backgroundColor } = this.state.segments[i]
            const valueSegment = valueEnd - valueBegin
            const valueTotal = this.state.valueMax - this.state.valueMin
            const width = (valueSegment / valueTotal) * 100
            segmentDiv.style.width = `${width}%`
            segmentDiv.style.backgroundColor = backgroundColor
            segmentDiv.style.height = this.state.valuesBar.height
            segmentDiv.style.resize = "none"
            segmentDiv.classList.add('value-segment')

            this.valuesBar.appendChild(segmentDiv)
            this.valueSegments.push(segmentDiv)
            // If not the last segment, create divider, attach it as segment.right, make 
            // divider.left a reference to segment in state
        }
        for (let i = 0; i < this.valueSegments.length; i++) {
            if (i !== this.valueSegments.length - 1) {
                const dividerDiv = document.createElement('div')
                dividerDiv.style.backgroundColor = "black"
                dividerDiv.style.width = "0"
                dividerDiv.style.position = "relative"
                // The divider is a parent div with 0 width and relative pisition. It's
                // child is the actual visible divider with width 2px and position absolute
                // This allows us not to worry about divider width when calculating segment width
                const dividerChild = document.createElement('div')
                dividerChild.style.position = 'absolute'
                dividerChild.style.left = "-1px"
                dividerChild.style.width = "2px"
                dividerChild.style.backgroundColor = "black"
                dividerChild.style.height = `${this.state.valuesBar.height}px`
                dividerDiv.appendChild(dividerChild)
                dividerChild.style.cursor = "ew-resize";
                dividerDiv.left = this.valueSegments[i]
                this.valueSegments[i].right = dividerDiv
                this.valueSegments[i].insertAdjacentElement("afterend", dividerDiv)
                dividerChild.addEventListener("mousedown", this.valueDividerMousedownHandler) // fix
            }

            // If not first segment, reference the right divider of last segment,
            // attach is segment.left, and reference current segment as divider.right
            if (i !== 0) {
                const dividerDiv = this.valueSegments[i - 1].right
                this.valueSegments[i].left = dividerDiv
                dividerDiv.right = this.valueSegments[i]
            }
        }
    }

    // *************************** Tooltip Handlers *************************** \\

    initTooltip() {
        this.state.tooltip.element = document.querySelector('#tooltip')
        this.state.tooltip.form.element = document.querySelector('.tooltip form')
        this.state.tooltip.form.element.addEventListener('submit', this.tooltipFormSubmitHandler)
        this.state.tooltip.removeButton = document.querySelector('.removeButton')
        this.state.tooltip.removeButton.addEventListener('click', this.segmentRemoveHandler)
        this.state.tooltip.closeTooltipButton = document.querySelector('.closeTooltipButton')
        document.addEventListener('click', this.tooltipCloseHandler)

        document.querySelector(`input[type="radio"]#${this.state.tooltip.form.state}`).checked = true;
        document.querySelectorAll('input[name="tab-group"]').forEach((elem) => {
            elem.addEventListener("change", (e) => {
                const state = e.target.id;
                this.state.tooltip.form.state = state
            });
        });
        this.bar.appendChild(this.state.tooltip.element)
    }

    tooltipFormSubmitHandler(e) {
        e.preventDefault()
        const colorValue = this.state.tooltip.form.colorInput.value
        const textValue = this.state.tooltip.form.textInput.value
        if (this.state.tooltip.form.state === "edit") {
            this.selectedSeg.backgroundColor = colorValue
            this.selectedSeg.innerText = textValue
            this.clearBar()
            this.clearValuesBar()
            this.drawBar()
            this.distributeLinearValues()
            this.drawValuesBar()
        } else if (this.state.tooltip.form.state === "add") {
            const index = this.state.segments.indexOf(this.selectedSeg)

            // We get the width of the new segment by getting how
            let leftLengths = 0
            for (let i = 0; i < index; i++) {
                leftLengths = leftLengths + this.state.segments[i].element.getBoundingClientRect().width
            }
            const pxFromLeft = this.x - this.bar.getBoundingClientRect().left - leftLengths
            const newWidth = (pxFromLeft / this.bar.getBoundingClientRect().width) * 100

            // const totalPercent = getTotalWidthPercent
            // const halfWidth = this.selectedSeg.width / 2
            this.selectedSeg.width = this.selectedSeg.width - newWidth
            const newSeg = {
                backgroundColor: colorValue,
                width: newWidth,
                display: "flex",
                height: `${this.state.bar.height}px`,
                innerText: textValue,
                left: null,
                right: null,
                element: null
            }

            this.clearBar()
            this.state.linearValues && this.clearValuesBar()
            const segmentsCopy = [...this.state.segments]
            segmentsCopy.splice(index, 0, newSeg)
            this.state.segments = segmentsCopy
            this.drawBar()
            this.distributeLinearValues()
            this.state.linearValues && this.drawValuesBar()
        }
        this.selectedSeg = null
        this.x = 0
        this.state.tooltip.element.style.display = "none"
        this.printState()
    }

    tooltipOpenHandler(e) {
        this.state.tooltip.element.style.display = "block"
        const location = { x: this.x - 4, y: this.bar.getBoundingClientRect().top }
        this.state.tooltip.element.style.left = `${location.x}px`
        this.state.tooltip.element.style.top = `-${this.state.tooltip.element.offsetHeight}`
    }

    tooltipCloseHandler(e) {
        if (this.state.tooltip.element.style.display !== "none") {
            if (!this.state.tooltip.element.contains(e.target)) {
                this.state.tooltip.element.style.display = "none"
            }
        }
    }

    // *************************** Segment Handlers *************************** \\

    segmentClickHandler(e) {
        e.preventDefault()
        this.x = e.clientX

        // Set which segment we clicked on
        this.selectedSeg = this.state.segments.find(s => {
            return s.element === e.target
        })
        // Hydrate form
        this.state.tooltip.form.textInput = document.querySelector('input#text')
        this.state.tooltip.form.textInput.value = this.selectedSeg.innerText
        this.state.tooltip.form.colorInput = document.querySelector('input#color')
        this.state.tooltip.form.colorInput.value = this.selectedSeg.backgroundColor
        // Make sure tooltipClose handler always runs before we open 
        setTimeout(() => {
            this.tooltipOpenHandler()
        }, 0)
    }

    segmentRemoveHandler(e) {
        e.preventDefault()
        if (!this.selectedSeg.left && !this.selectedSeg.right) {
            return
        } else if (!this.selectedSeg.left) {
            this.clearBar()
            this.clearValuesBar()
            const neighbor = this.selectedSeg.right.right
            let totalWidthPercent = this.getTotalWidthPercent()
            const restWidthPercent = totalWidthPercent - parseFloat(this.selectedSeg.width)
            const newWidth = 100.00 - restWidthPercent + neighbor.width
            neighbor.width = newWidth
            neighbor.left = null
            this.state.segments = this.state.segments.filter(seg => seg.element !== this.selectedSeg.element)
        } else if (!this.selectedSeg.right) {
            this.clearBar()
            this.clearValuesBar()
            const neighbor = this.selectedSeg.left.left
            let totalWidthPercent = this.getTotalWidthPercent()
            const restWidthPercent = totalWidthPercent - parseFloat(this.selectedSeg.width)
            const newWidth = 100.00 - restWidthPercent + neighbor.width
            neighbor.width = newWidth
            neighbor.right = null
            this.state.segments = this.state.segments.filter(seg => seg.element !== this.selectedSeg.element)
        } else {
            this.clearBar()
            const leftNeighbor = this.selectedSeg.left.left
            const rightNeighbor = this.selectedSeg.right.right
            let totalWidthPercent = this.getTotalWidthPercent()
            const restWidthPercent = totalWidthPercent - parseFloat(this.selectedSeg.width)
            const halfWidth = (100.00 - restWidthPercent) / 2
            leftNeighbor.width = leftNeighbor.width + halfWidth
            rightNeighbor.width = rightNeighbor.width + halfWidth
            this.state.segments = this.state.segments.filter(seg => seg.element !== this.selectedSeg.element)
        }
        this.drawBar()
        this.distributeLinearValues()
        if (this.state.linearValues) {
            this.clearValuesBar()
            this.drawValuesBar()
        }
        this.state.tooltip.element.style.display = "none"
        this.printState()
    }

    segmentDragstartHandler(e) {
        // create custome drag image
        const clone = e.target.cloneNode(true)
        clone.style.position = "absolute";
        clone.style.top = "-1000px";
        document.body.appendChild(clone);
        e.dataTransfer.setDragImage(clone, clone.getBoundingClientRect().width / 2, clone.getBoundingClientRect().height / 2)

        this.selectedSeg = this.selectedSeg = this.state.segments.find(s => {
            return s.element === e.target
        })
    }

    segmentDragentertHandler(e) {
        e.preventDefault()
        this.draggedOver = this.state.segments.find(s => {
            return s.element === e.target
        })
        if (this.draggedOver.element !== this.selectedSeg.element) {
            this.draggedOver.element.style.borderBottom = 'black 3px solid'
        }
    }

    segmentDragleaveHandler(e) {
        e.target.style.border = 'none'
        e.preventDefault()
        if (e.target === this.draggedOver.element) {
            this.draggedOver = null
        }
    }

    segmentDragendHandler(e) {
        if (!this.draggedOver) {
            this.selectedSeg = null
        }
    }

    segmentDropHandler(e) {
        e.preventDefault()
        if (this.draggedOver && this.draggedOver.element !== this.selectedSeg.element) {
            const indexSelected = this.state.segments.indexOf(this.selectedSeg)
            const indexDraggedover = this.state.segments.indexOf(this.draggedOver)
            this.state.segments[indexSelected] = this.draggedOver
            this.state.segments[indexDraggedover] = this.selectedSeg
            this.clearBar()
            this.drawBar()
            this.distributeLinearValues()
            if (this.state.linearValues) {
                this.clearValuesBar()
                this.drawValuesBar()
            }
        }
        this.draggedOver = null
        this.selectedSeg = null
    }

    // *************************** Divider Handlers *************************** \\

    valueDividerMousedownHandler(e) {
        e.preventDefault()
        this.selectedDivider = e.target.parentNode;

        // Get the current mouse position
        this.x = e.clientX;
        this.leftWidth = this.selectedDivider.left.getBoundingClientRect().width;
        this.rightWidth = this.selectedDivider.right.getBoundingClientRect().width;

        // this.selectedDivider.style.cursor = "col-resize";
        document.body.style.cursor = "ew-resize";

        this.selectedDivider.left.style.userSelect = "none";
        // this.selectedDivider.left.element.style.pointerEvents = "none"; // removed onclickhanlder

        this.selectedDivider.right.style.userSelect = "none";

        // Attach the listeners to `document`
        document.addEventListener("mousemove", this.valueDividerMousemoveHandler);
        document.addEventListener("mouseup", this.valueDividerMouseupHandler);
    };

    valueDividerMousemoveHandler(e) {
        e.preventDefault()
        // How far the mouse has been moved
        const dx = e.clientX - this.x;
        const newLeftWidth =
            ((this.leftWidth + dx) * 100) /
            this.valuesBar.getBoundingClientRect().width;
        this.selectedDivider.left.style.width = `${newLeftWidth}%`;

        const newRightWidth =
            ((this.rightWidth - dx) * 100) / // +2 because of width of dividers
            this.valuesBar.getBoundingClientRect().width;
        this.selectedDivider.right.style.width = `${newRightWidth}%`;
    }

    valueDividerMouseupHandler() {
        document.body.style.removeProperty("cursor");

        // Remove the handlers of `mousemove` and `mouseup`
        this.state.linearValues && this.toggleLinearClickHandler()
        this.distributeCustomValues()
        console.log(this.state.segments)

        this.leftWidth = 0
        this.rightWidth = 0
        this.x = 0
        this.selectedDivider = null

        document.removeEventListener("mousemove", this.valueDividerMousemoveHandler);
        document.removeEventListener("mouseup", this.valueDividerMouseupHandler);
        let totalWidthPercent = 0
        let totalWidthPixels = 0

        this.valueSegments.forEach(seg => {
            totalWidthPixels += seg.getBoundingClientRect().width
            totalWidthPercent += parseFloat(seg.style.width)
        })
        this.printState()
    };

    dividerMousedownHandler(e) {
        e.preventDefault()
        this.selectedDivider = e.target.parentNode;

        // Get the current mouse position
        this.x = e.clientX;
        this.leftWidth = this.selectedDivider.left.element.getBoundingClientRect().width;
        this.rightWidth = this.selectedDivider.right.element.getBoundingClientRect().width;

        document.body.style.cursor = "ew-resize";

        this.selectedDivider.left.element.style.userSelect = "none";

        this.selectedDivider.right.element.style.userSelect = "none";

        // Attach the listeners to `document`
        document.addEventListener("mousemove", this.dividerMousemoveHandler);
        document.addEventListener("mouseup", this.dividerMouseupHandler);
    };

    dividerMousemoveHandler(e) {
        e.preventDefault()
        // How far the mouse has been moved
        const dx = e.clientX - this.x;
        const newLeftWidth =
            ((this.leftWidth + dx) * 100) /
            this.parent.getBoundingClientRect().width;
        this.selectedDivider.left.element.style.width = `${newLeftWidth}%`;
        this.selectedDivider.left.width = newLeftWidth

        const newRightWidth =
            ((this.rightWidth - dx) * 100) / // +2 because of width of dividers
            this.parent.getBoundingClientRect().width;
        this.selectedDivider.right.element.style.width = `${newRightWidth}%`;
        this.selectedDivider.right.width = newRightWidth
    }

    dividerMouseupHandler() {
        document.body.style.removeProperty("cursor");

        // this.selectedDivider.left.element.style.removeProperty("user-select");
        // this.selectedDivider.left.element.style.removeProperty("pointer-events");

        // this.selectedDivider.right.element.style.removeProperty("user-select");
        // this.selectedDivider.right.element.style.removeProperty("pointer-events");

        //old
        //  resizer.style.removeProperty("cursor");
        // document.body.style.removeProperty("cursor");

        // leftSide.style.removeProperty("user-select");
        // leftSide.style.removeProperty("pointer-events");

        // rightSide.style.removeProperty("user-select");
        // rightSide.style.removeProperty("pointer-events");

        // Remove the handlers of `mousemove` and `mouseup`


        this.leftWidth = 0
        this.rightWidth = 0
        this.x = 0
        this.selectedDivider = null

        this.distributeLinearValues()

        document.removeEventListener("mousemove", this.dividerMousemoveHandler);
        document.removeEventListener("mouseup", this.dividerMouseupHandler);
        let totalWidthPercent = 0
        let totalWidthPixels = 0
        this.state.segments.forEach(seg => {
            totalWidthPixels += seg.element.getBoundingClientRect().width
            totalWidthPercent += parseFloat(seg.element.style.width)
        })
        if (this.state.linearValues) {
            this.clearValuesBar()
            this.drawValuesBar()
        }
        this.printState()
        console.log(this.state.segments, this.valueSegments)

    };

    // *************************** LinearToggle Methods *************************** \\

    initToggleLinear() {
        const toggleBtn = document.querySelector('.toggle-linear')
        toggleBtn.addEventListener('click', this.toggleLinearClickHandler)
        this.setLinearToggleInnertext()
    }

    setLinearToggleInnertext(clicked) {
        const toggleBtn = document.querySelector('.toggle-linear')
        if (this.state.linearValues) {
            toggleBtn.innerText = "Linear"
            this.distributeLinearValues()
            if (clicked) {
                this.clearValuesBar()
                this.drawValuesBar()
            }
        } else {
            toggleBtn.innerText = "Custom"
        }
    }

    toggleLinearClickHandler(e) {
        this.state.linearValues = !this.state.linearValues
        this.setLinearToggleInnertext(true)
    }

    // *************************** Print Methods *************************** \\

    initPrintable() {
        document.querySelector('.printButton').addEventListener('click', this.printState)
        this.printState()
    }

    printState() {
        const printableState = this.state.segments.map(({ innerText, width, backgroundColor, valueEnd, valueBegin }) => ({ width, backgroundColor, valueEnd, valueBegin, text: innerText }))
        document.querySelector('#print').innerText = JSON.stringify(printableState, null, 1)
    }

    // *************************** Utility Methods *************************** \\

    getTotalWidthPercent(index = this.state.segments.length) {
        let totalWidthPercent = 0
        for (let i = 0; i < index; i++) {
            totalWidthPercent += parseFloat(this.state.segments[i].width)
        }
        return totalWidthPercent
    }

    getTotalWidthPercentValues(index = this.valueSegments.length) {
        let totalWidthPercent = 0
        for (let i = 0; i < index; i++) {
            totalWidthPercent += parseFloat(this.valueSegments[i].style.width)
        }
        return totalWidthPercent
    }

    bindHandlers() {
        this.dividerMousedownHandler = this.dividerMousedownHandler.bind(this)
        this.dividerMousemoveHandler = this.dividerMousemoveHandler.bind(this)
        this.dividerMouseupHandler = this.dividerMouseupHandler.bind(this)
        this.tooltipFormSubmitHandler = this.tooltipFormSubmitHandler.bind(this)
        this.segmentClickHandler = this.segmentClickHandler.bind(this)
        this.segmentRemoveHandler = this.segmentRemoveHandler.bind(this)
        this.segmentDragstartHandler = this.segmentDragstartHandler.bind(this)
        this.segmentDragentertHandler = this.segmentDragentertHandler.bind(this)
        this.segmentDragleaveHandler = this.segmentDragleaveHandler.bind(this)
        this.segmentDragendHandler = this.segmentDragendHandler.bind(this)
        this.segmentDropHandler = this.segmentDropHandler.bind(this)
        this.tooltipCloseHandler = this.tooltipCloseHandler.bind(this)
        this.tooltipOpenHandler = this.tooltipOpenHandler.bind(this)
        this.distributeLinearValues = this.distributeLinearValues.bind(this)
        this.initToggleLinear = this.initToggleLinear.bind(this)
        this.toggleLinearClickHandler = this.toggleLinearClickHandler.bind(this)
        this.drawValuesBar = this.drawValuesBar.bind(this)
        this.valueDividerMousedownHandler = this.valueDividerMousedownHandler.bind(this)
        this.valueDividerMousemoveHandler = this.valueDividerMousemoveHandler.bind(this)
        this.valueDividerMouseupHandler = this.valueDividerMouseupHandler.bind(this)
        this.distributeCustomValues = this.distributeCustomValues.bind(this)
        this.initPrintable = this.initPrintable.bind(this)
        this.printState = this.printState.bind(this)
    }
}