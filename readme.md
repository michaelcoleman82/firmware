# EBWU Hardware and Firmware

## Prerequisites
- [CircuitMaker](https://documentation.circuitmaker.com/display/CMAK/Exploring+CircuitMaker)
- [Pullup/Pulldown Resistors](https://youtu.be/Bqk6M_XdIC0)
- [Crimping Dupont Connectors](https://youtu.be/GkbOJSvhCgU)
- [`pigpio` Library](https://github.com/fivdi/pigpio)

## Simulation
![](https://i.gyazo.com/00d6dbad343b9b41ef1e4e266356a17a.gif)

*Click **[here](http://everycircuit.com/circuit/6401615620997120)** to modify the simulation*


- The sheet is modeled by the two SPST switches and the 3v3 logic are pin 1 on the Pi.

- To the right of the switches are pulldown resistor configurations that is set up *internally* by the Pi.  
- The leds make up a simple representation of the sheet state and are **not** actual discreet components.  

**Note:**  No discreet component are needed at this stage.

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

3. You need two crimp the two single wires(brown and red here) into one housing and the couple into into one housing. Strip about out 1/8 of a inch, keeping the couple together. Then twist the couple.

  ![](https://i.imgur.com/w0xTqft.jpg)

4. Crimp them into there housing. See Prerequisites for how to do this. The important thing is two keep the couple together in the same housing. Like so:

  ![](https://i.imgur.com/tSy9w8G.jpg)

5. You need finished and secure crimps that look something like this:   

  ![](http://techmattmillman.s3.amazonaws.com/wp-content/uploads/2015/06/phcrimped.jpg)

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
