#  EBWU Hardware and Firmware

## Prerequisites
- [CircuitMaker](https://documentation.circuitmaker.com/display/CMAK/Exploring+CircuitMaker)
- [Pullup/Pulldown Resistors](https://youtu.be/Bqk6M_XdIC0)
- [Crimping Dupont Connectors](https://youtu.be/GkbOJSvhCgU)
- [`pigpio` Library](https://github.com/fivdi/pigpio)
- [aws cli](http://docs.aws.amazon.com/cli/latest/reference/iot/index.html)
- [aws iot sdk js](https://github.com/aws/aws-iot-device-sdk-js)
- [Serverless with AWS](https://serverless.com/framework/docs/providers/aws/)
- [Cloud Formation Types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
# Hardware
## Simulation
![](https://i.gyazo.com/518f230c382b9eb15ae46f08db553f62.gif)

*Click **[here](http://everycircuit.com/circuit/6401615620997120)** to modify the simulation*


- The sheet is modeled by the two SPST switches and the 3v3 logic corresponds to pin 17 on the Pi.

- To the right of the switches are pulldown resistor configurations that are set up *internally* by the Pi. Pins 19 and 21.  

- The leds make up a simple representation of the sheet state and are **not** actual discreet components.  

**Note:**  No discreet components are needed at this stage.

## Schematic
![](https://i.gyazo.com/1f86d4872b94582664dec2c3feab5334.png)
*Click **[here](https://workspace.circuitmaker.com/Projects/Details/Joe-Narvaez/ebwu)** to modify the schematic*

- The Pi connector and the 4 button connectors are built per spec. Together these components make up the harness for easy setup of product.

- The schematic is to simply show all the connection and to introduce professional design software into the product. There are **no** PCB footprints at this stage.  

**Note:** That on pin 1 of the Pi Connector (J2), there is a node that splits the voltage. Physically, this occurs inside the connector. The two wires are crimped into the same housing.


## Construction
### Harness
#### Tools

 - [JST Crimper](http://a.co/7kAxJBj)

 - Wire Stripper with AWG 26 cutter

 - One Dupont Jumper wire with male end

 ![](https://i.imgur.com/egDGo70.jpg)

#### Materials
- [Ribbon Cable](http://a.co/e49JKGi)

- [3 JST pin housings](http://a.co/8123Xy4) (However, you may need more in case of bad crimps.)

- [1 JST 3-pin female connector](http://a.co/8123Xy4)

![](https://i.imgur.com/81Xt63i.jpg)
#### Steps
1. You need **4** wire  ribbon that is approximately **25-30 inches** in length. Peel and cut until you have the length and number of wires. DO NOT peel apart individual wires. When you cut make sure its 90° to the wire. All wires need to be the **exact length** to fit into the housing properly. Color doesn't matter. You should have about 30 inches of ribbon that is together, like so:

  ![](https://i.imgur.com/ODABN1Z.jpg)

2. You need to fit two bare wires into 1 housing and the remaining two into their own housing. Take them apart so you have two together and the other two separated. Only take them apart enough to to crimp comfortably. Please keep the ribbon intact.

  ![](https://i.imgur.com/AEI57sp.jpg)

3. Strip about out 1/8 of a inch, keeping the couple together. Then twist the couple.

  ![](https://i.imgur.com/w0xTqft.jpg)

4. Crimp them into there housing. See Prerequisites for how to do this. The important thing is two keep the couple together in the same housing. Like so:

  ![](https://i.imgur.com/TwAGWJj.jpg)

5. You need finished and secure crimps that look something like this:   

  ![](https://i.imgur.com/4KHoBAn.jpg)

6. Lastly push your 3 crimps into the JST connector, making sure you put the couple on the left side of the housing [pin](https://i.gyazo.com/2ec7647abea16c5264b9a2ddd9c1c047.png) so the correct side latches on.  See the photo  below for reference. We don't want to risk the exposed latches touching the other pins. Use the Dupont pin to push it in until you hear a snap.

  ![](https://i.imgur.com/3t5m7od.jpg)

7. Test to make sure you get a voltage reading. Connect it according to the schematic.

  ![](https://i.imgur.com/9mUZBV3.jpg)

8. On the other end of the ribbon pull apart each the wire about 4 inches.  Strip off about 2 inches of insulation.  Loop and wrap it around any hole on the male button. Hold the wrap and twist until tight.  Do this all four buttons.

  ![](https://i.imgur.com/OcWUHeq.jpg)

9. Make sure all the connections line up

  ![](https://i.imgur.com/xpAGCi9.jpg)

10. Test connections against firmware(see below)

10. Lastly Solder the button joints.

# Firmware
0. **Run** `npm install` To install dependencies

1. **Setup:** `npm run get-certs` This gets all the certs needed for connecting to IoT service. You should have a now have a directory  called 'certs'. Please do not push these to github.

2. **Create Resources:**
    1. `npm run list-certs`  This lists your certs. Grab the `certificateArn` value  and create a `cloud-configs/vars.yml` file. And paste in your `certificateArn` .It should look somthing like this.

      ```yml
      # vars.yml
      CertificateARN: arn:aws:iot:us-east-1:1233456789:cert/dfsjkhdsfahjkdfshjur43hi43iewjkknj44knj3kjn43
      ```

    2. `sls deploy` This creates all the resources in the cloud. Make sure you have you aws credentials configured correctly to deploy the product account. This process takes a few minutes.z

3. **Run:** `npm start` This runs the code. It should log out connected or an error. If you open the file you'll see there are 6 sections:

    1. `imports` Here are your dependencies for the file

    2. `constants`  the `SENSITIVITY` constant fine tunes how often the function fires because the sheet is essentially a volatile switch. It used in a standard [debounce](http://whatis.techtarget.com/definition/debouncing) helper function.

    2. `configurations`  Sets up the GPIOs and iot device with the correct options. Run `npm run get-endpoint` to get the host value.

    3. `helpers` Here are functions that we need to call a few times: `debounce` and `cleanUp`. cleanUp just turns off the LED when the program terminates.

    4. `set initial state` The first write makes sure we have [access to the led](https://raspberrypi.stackexchange.com/questions/697/how-do-i-control-the-system-leds-using-my-software). The other two just create files with the inital state on each side.

    5. `main` Here is where the magic happens. If the configuration for the device is correct,  it should connect and turn on the LED. There's a function in charge of publishing state to the cloud. That is called when an event happens on either side of the sheet:

        `sideA.on('interrupt', debounce( level => ...`

    Here debounce helps us fine tune the sensitivity.

    6. `error handling` The first logs a connection error. The others just turn off the LED for any of those scenarios.
