import React from "react"

let scriptAdded = false
class PayPalButton extends React.Component {
  constructor(props) {
    super(props)
  }

  addScript = () => {
    if (scriptAdded) {
      this.executeScript()
      return
    }

    const SCRIPT_URL = "https://static.liqpay.ua/libjs/checkout.js"
    const container = document.body || document.head
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.onload = () => {
      this.executeScript()
    }
    container.appendChild(script)
    scriptAdded = true
  }

  executeScript = () => {
    const { formSettings, shopSettings, onPayment } = this.props

    LiqPayCheckout.init({
      data: formSettings.data,
      signature: formSettings.signature,
      language: formSettings.language,
      embedTo: "#liqpay_checkout",
      mode: "embed",
    })
      .on("liqpay.callback", data => {
        if (data.status === "success") {
          onPayment()
        }
      })
      .on("liqpay.ready", data => {
        // ready
      })
      .on("liqpay.close", data => {
        // close
      })
  }

  componentDidMount() {
    this.addScript()
  }

  componentDidUpdate() {
    this.executeScript()
  }

  render() {
    const { formSettings, shopSettings, onPayment } = this.props

    return <div id="liqpay_checkout" />
  }
}

export default PayPalButton
