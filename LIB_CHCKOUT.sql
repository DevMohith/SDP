PGDMP  $    #    	            |           SDP    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    SDP    DATABASE     x   CREATE DATABASE "SDP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE "SDP";
                postgres    false            �            1259    16727    checkouts_by_title    TABLE     �  CREATE TABLE public.checkouts_by_title (
    checkedout boolean,
    title character varying(32767),
    author character varying(255),
    subjects character varying(32767),
    publisher character varying(255),
    publicationyear character varying(255),
    user_id character varying(255),
    bibnum integer,
    checkouttime timestamp without time zone,
    checkintime timestamp without time zone,
    checkout_id integer NOT NULL
);
 &   DROP TABLE public.checkouts_by_title;
       public         heap    postgres    false            �            1259    17030 "   checkouts_by_title_checkout_id_seq    SEQUENCE     �   CREATE SEQUENCE public.checkouts_by_title_checkout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.checkouts_by_title_checkout_id_seq;
       public          postgres    false    215            �           0    0 "   checkouts_by_title_checkout_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.checkouts_by_title_checkout_id_seq OWNED BY public.checkouts_by_title.checkout_id;
          public          postgres    false    217            V           2604    17031    checkouts_by_title checkout_id    DEFAULT     �   ALTER TABLE ONLY public.checkouts_by_title ALTER COLUMN checkout_id SET DEFAULT nextval('public.checkouts_by_title_checkout_id_seq'::regclass);
 M   ALTER TABLE public.checkouts_by_title ALTER COLUMN checkout_id DROP DEFAULT;
       public          postgres    false    217    215            �          0    16727    checkouts_by_title 
   TABLE DATA           �   COPY public.checkouts_by_title (checkedout, title, author, subjects, publisher, publicationyear, user_id, bibnum, checkouttime, checkintime, checkout_id) FROM stdin;
    public          postgres    false    215   _       �           0    0 "   checkouts_by_title_checkout_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.checkouts_by_title_checkout_id_seq', 103, true);
          public          postgres    false    217            X           2606    17039 *   checkouts_by_title checkouts_by_title_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.checkouts_by_title
    ADD CONSTRAINT checkouts_by_title_pkey PRIMARY KEY (checkout_id);
 T   ALTER TABLE ONLY public.checkouts_by_title DROP CONSTRAINT checkouts_by_title_pkey;
       public            postgres    false    215            Y           1259    17059    idx_checkouts_title    INDEX     S   CREATE INDEX idx_checkouts_title ON public.checkouts_by_title USING btree (title);
 '   DROP INDEX public.idx_checkouts_title;
       public            postgres    false    215            Z           1259    17058    idx_checkouts_user_id    INDEX     W   CREATE INDEX idx_checkouts_user_id ON public.checkouts_by_title USING btree (user_id);
 )   DROP INDEX public.idx_checkouts_user_id;
       public            postgres    false    215            [           2606    17048 1   checkouts_by_title checkouts_by_title_bibnum_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checkouts_by_title
    ADD CONSTRAINT checkouts_by_title_bibnum_fkey FOREIGN KEY (bibnum) REFERENCES public.library_collection_inventory(bibnum) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public.checkouts_by_title DROP CONSTRAINT checkouts_by_title_bibnum_fkey;
       public          postgres    false    215            �      x��}�r�H��3�+0�P� �EiccZ"�"�!UDgU�H�H�@��%��|Ǽ�'��'��̗�9�R��l�.�
R�p�~�+J�~��b-���'���S�:��"۪Ա�c ��7��s��3{�g�b���u</��4���G\5�v(7U����q�o*ŏd�������ϟ�~0�,���wt�Nlox�gCיN��pO��C�Jy;{�T�JOr��9~c���g�n׎҅�P���joTa?d�=�p�Fe�D�YjG�e�*17�tQD;LH�9�|���Zΰ�g|��ؗ�m��l��ǋ��osU��?GCo����������N����H�����*JK���	~�i�M%��wUG��<Ƣ}���2��"�8z����u�*�}VƩ}��e�V�c5��|��ĺ��B��S�eUe�����?�'���X��h�_��̳4[��(�7�����~�=~n�ו*�~S�^��lg?4�7��,���Ǭ�,��3<�_S��q�k&�w�q=�~0޳��ٮw�g��xc�s��)HA=�Xl2��R~67wj�s�L��˜�r��Xp_}��?��f��&+�]'*�K�^3?��'����<���*N9N��P8��\��
�����E��+�8�E\<3�S����������b��:Of�k��*.�����M���-��<w����̛��Cg4��p����b���<[�T�������JE���8�M�$�}�U�l�C����,z�~SE/#>ڞ���8ɞc:UG~}T�r5˺��Wx�~��Dmϰn�E������N���&�����UI�K��Y�H�1V�C�p��!�'��~�F�;=�gn �L�����l,��p����) T��D�B�p1�Y��l�}��/�Y����?[k�\W����&.��9��v���xF�o������3�=}��A`<s�4�g��G<v�Dx���E�/_T�f�m�sP�n�s�u���8RVy��xR�Ia�F�0��)�����zF�|�f��<Fy��ۜo�u�s��w��92b���]�א�Ԍ�T_�Q�կ��_�*]BYE�l"0'����gA`z��O�rƓ����O�p��hm_$ѣ�=2�9�x��U��x�S��T��c���R|�do�r������]Pb�D��}�g�;�c����s���՜>h�i��n���cHRl����g�\v`?7�m��T���~�����0;j
��r������]>�,Ǯ{���Jȝ���c_�꾩
U�e�rH���ȫ�"WtO����?����a8&D�`vEk�4��n�W�,��,�uE�ڕh5W���$S��|�h�?��֛�T�Q-����VOO�ѭ��>�ި4�
M4����d:��{��FgC�J���.�
H��I��8���;[dWan���tU���J�_Ԫ�v����]����e}�1íG��y�(�i2�
���,��pY��v���"<�*�D	0k�t�<��(]V��L�C�}o��|��qVe�p��6]V��d�U���d����Ɲ9b$����N8y�.`�Q<��yZ�u0����;2���!���~�4��_��p�ײ�� �yJ����Y�R�Z��2kl����x�i}L��l:�4c��葼���e%��v��8�8e��/�T������jK2��6˓��&h��͠�����9nA�c��*0X��V�.rX���
�W�\�����a1���d:�î��<Z
L���m�'��r��u�,�d�V�W���`���@�a\���C�ݪ<�����ׁ��1F����_�i>�b��e��dГ��3�ֹ�K �<]C��yi��Oy�g�N�_������߰@��4�@$>�^
F5��J�lz^8�>j�j��Cυ-32��R���A8�X�G�Y��J�lPF�����C5��?���#=��!��r�[X�b�l��
��p��ā\�<�_bd���a�q���ET4p�,܈X�2�a�B ����U���,��ɦ��ݵ�2yC����Ѐ3��S'O�ɨ8�ʜ������Xdk2��̋�~8f^`Z!�q����_��8o0�,'q��M�yX��h�L�(�CX�5����@�媰�9�=]և�,%٦G-x1��1>G�o�G&��<Z'�dd�?W`�B�0h�D�(��F�V~%�t1��l�.���h=�)Z�q�?�y�ސ��fωqnW��)y�X9�|����sV����� 6Q"r�Z�]�2`�M���%J��-J�>����xA[��	
���*r}�¾�ݰk��}�7���=Q�c�(�W�2N�~H���%����XpO��O���b�'�F�ۀ�`��d�KL1C���+��v�*��L�#�m�$��$�S���e^i���g|��et��^&���J�I\��b���M�I.s����*��U\�G�բj�F}�������>�1KkЦ�X���q�]h������N�`<4@G�����No%��(��8��c�cP�P�x�ź*  U<h#ץ4���ϩ�,�h�f�췰ӈ����� �6�8f��G��
7 �[E@vD�Ȓ�hm�c���/�8O�Ro2��HV8���]D��5ցj;�9a���u/1#G��,[�w�=��Ў$�&$>�	3 �u�qKw��L���x0\d.�w6=:�ȝc�H���ǁt\Dz�iG�9���R�ǧs6���ӣ��;����z�E�v�������+0cX /�������hT\�v+�b������{6�p��xZ�*�As��K�z��tP�Ҭw��eQٯ.��Ŷ4�⮱dE�k�����Z�V��v�U����q@�(f�^��(��,�ҿ�V)���JPC�m ���)����3x����s-�x�@;���"Ζy�Y�.��̲T�g�'�l����Zg�|��{@5�I�n��x��Ď�q�p���9��4���'Ѣ�����D ^����_�B�����W�L8�����S쒷E4�����gO]��8?��g�-�z�W��C�����/�����١͎	��`b��1��Pߦ�x�Z�9lV�x���oX�}M�W�7�	���{���I����cCj�4hI%�C'�0_7UNm��Sc�#_�G���A�]S��暮0���)�*�]�g�B�5$Fp�����a�$F�D������l)�ik!{*�Ǿ���SO,o�MC!H0@�M=w���J�@�}�ц7��� z��QT���\��;�%��&�wL���pl�(}���h�N��"`�b�5��G�|Y�_�~V����٢�e$��6����:�*�/h���r �<d�c*f�%�)�����r-k���6���lQ�i` қ�nZ5��7~�E�����k}(��k���鵂�I�78�({�P�&�*W�-%ȸUц۾�p��*_�q ]�*F@��D�C?mT#3x�\��3.���#��W���"@\.e���X��0�\pa�����iϳ\$z�'jbkR��
�X��mt�Ȇ����Ӧ��Z��}��&�y��<e�y�g4��C��.��
h���!�^�8�������b�t2�]�����3or掝Q0ž2�y�4�������q�g;�n.X��}�*c�ő�ǏBS��煜��T9?��ߦ���G�v~�F�HN�x`G��71�9\�>��A�F_G�ڌ^�gA��@F����h�VJ{R�~�sp�c��@YÞ2¹_⼂��%N���������1�s���c���7�K��O�,nU �(��]{�%�=�|�����{�D{�58�<u��Ǧ�.�Rf��_܂�
��uÞ)sV(R�\�����WY���"B� ~'� 3�����-��PT�I�]�6��p��@oc����m�!"�Z��?���2N��`
H94�e�4��:�H*�D�>�U0��rE��*&    L������1����/ٶ`ș�r8�*���������Qg(�t�Y?vɨX=Tz�bio5��\�&]�ͤ��l8�}ꇾ��}Ґ�صZ�Xǥ0ԧ���U�u���@�,�q�N�z�t�Ǹm��v/�hv?gb���g�\����f�D�4��蒵���M�2� �@&�%t���n!���^��q���t}U��c����q�i;��^G�!�6�f	�F}@�)��?�oq���7{���$O��6�aT0݂��7��i}Ґ��*�*�D����!�а����9�=��b@_�hv���a��p���c��;�x��1�	�-�w�n�̐t��&�x�!�7���(��3{�m�~#{	�����6 ���u1_An�3��9|��v��Ǫ�h輳ީ-��e�''�!�5��W(g��4O�$�D��~<��5.a�<��<K^�- �%E�s�� ��P���<� I�<>��~P$>Ձ��<�|]%��e��ư�����a9�7t��g/�!�÷v���h��Apu���1M���`3ByB�c��Y_�V���e�ݢZ����;4t}'w�t1���NƠ;�>`�>i8j�c��3Ϩ���_�\�0\�mP���x�Fr;~_�����窋�*��CIu�+���� �Y7wLby���(����f�G�4$n���_}�fJ'�b�3�r���[��`�����v�4WI���P�5~:N��������BH���1q�Ș�H��2��,A��R������r9�
B�e��F8��K��HC"�&5�עP�(���KA�WQ������?-γGRn756�w捘�=����&�!��;&� �H�_z�0m�4�q{Aeq�@��8y�/9l����F��C����l�p����g�{�&S�5S������`5#@��9��15��}R@|�O���Ӿ�揱j��Վ�i��l��۠��y� ���Jt��rง����i��)�Z�G]):��`���f�*Ȏ$�5Y?�>7�9=�S�S�y�p7�$��S�#�7k#�]^m�	 E��ڴ�QE߇��)�3��l���+�8���1��.3��j�z�;�/e���s|z�x����G} �75��FA�R����  V�*��5B,����`�5��}���u:���@��A�d{^%rߧ�o�}U�R�D�e��V��X�u$����Ƃ���(u���ɴM{	�ڦ)�Ͱ�=Aqz8fSS�p�����3^� ?��<Z�*���3���y��d:�*!p%!7p��L0�H-��F��\�p����#Re�F�U;Dw֗�{�+�-�� �$mԾ]G�k�?o��[�r�V��,yL�nr�ՈItG,�d;񥷣0��L{����d��N�POu0M�}�@=��tð�H�ć��/�&��>���{�^t��{zS��������t���
��D:�
��R#�}��~jl�&�
��f�U�gk kVG�5X���$��6ۧ��^��z�e�
��%K	ҟ;��a�<?�4b��O�n�l��X2��o1�d�W��sGa'VN�4f��u��؝��M�в��`d����Rg R�?@�`_�F�ю�WE��y��5�Hub~F�os��'Ѥfi�4qY�?Q��!V3���گ��l�5��#hM'K��/����8ʖ;hs���e|O�� ��&�D��n��w@
h&}̰ݳ8�e;L�Z�T�,��wPCKa�r:��D�C���wU����zL��?��um��bdW����[-Ň��Ի����"��w�U��`����e�(���ګ/����n?�%n	k[B�$�V���Xw�Ӡ�����{?�ɤkvAT����9�����գc=�)��#6E�<T�5�{�Sf�����g`/ +ю���Tua��"��6 �W�>����V�ut��D'��A���1ӟ&�x!6�(��O=R0��ʉ���\��Nx'�"��c�q��L& N՟����$~�f
�K'v�_$�6<�Ϋ<ˣ���`;q�vl�I�U��L,Ȕ� 4�C/p�]��O
h�|�Ώ�vF��Y�˒�;�2�[ǃ��h�m��Y~��e�=���PL��:2���)�}�@�j=(����ER)Xo�����s�𑃰/���,C#��������g4KL�nG[�KJk���I73�^�)��~�N�X�n���	F��R�(��!�lѹS�`}�¡�~Ok�?J�ԊsѰ�f��I<�	� bzz���!.�r�)$���T �P�h��i�C��'�*��J��:�)�SFJ����B۾���q�O���B�0.{ g|��L�|�!��
��8ś+����� %տ��9țPQBD����)9{hg��Zo M����Q:#8�6Fo'��J�I�4d�n`DNz�p(���e�B���Hj��O����9*�<9rQ-�v��bC��~�m���SZd�J�	7�4��M����F!���8�ba]&�������'����:uaAܟ+����(�
�6��+=���A�(��X__{�!�>�P�5,q�\\vmF ��"�Ϫ�W� ��#�j��~��3*����3�{'Կ�B)�@~�QI,3�'���m��ب�f�җ��vwbpY��ݪ�&�!�tl���8�D�M�Q��NU��:�q^�L㦐b�����W<n<qrl�`G�7w�[�L���樂q��>3�jtl8��do�@�G
G2��c	!#�����z����h���(i�й�_������L�?���c��)}.#�4�RH�ؖ���#j�;��p0� ��ґ�-J:Tb�b>�����>Op�a��+L���-��1v�I���W�zp�� �f���vt�j�1�&��#�:=�A�x#jJ��j��!̟;��a�	|68#�c0��X�N,g~�^�? �ĸR��
̫TB���aS>_@����C�k8J\S;�v��+2�B�Bd%5��p���n?��#�s��[��d��<v u0�S���!=�9�7���7��G
�2�y�Ѭ�.�e\���hI��l�w���o�~�����+c�j�\��y%n���f��ӌ��`4��°FC���*m-8s���+&��ȩ��'���ITq.z5t0M}�/Xѻ֥>�V�Xs���r���vOo���g��d:2���u�4;�$��&x�@#- h6�Z�V����1����[�����bEey����#�L�3�n��m�l�BI��o�![�`��M~��C�u{ � �;����G����'�<Av4��L$�;��QΜ&��e$5��u�����督�o�B+j��\�~��J��v�0}D�{��)32��3T��<G~��~rّ%�*�u+qÙ��|O�L'��$���h��[�c/T8Y�$��(�'�P;t�҈����5�Z)XL{����<���|�1��'�/�2ґPb����+��Ȯ����
q���bt��o�e=��)�	w��3���}�h(k��M�z%�I,�2z��"�~����;5Ч`�5��~�dl�Ru��ʎaV�X�ǋ�^�!�\ߋ~o��$���Lj���lS��1L�r��@���]p@2��"W_�8�a�AXΘ�H��ȒoMj�:�t��y�΁�Jfl���Vd���ή����V�R�O!��~mBC]20&���]�H��"�i��a���b�sR�l�3	�ل5ZdeD�p����R×��: ��}��'T�2r �?�z��_�;y����i�;����+l�"�̬��o��b�U^-Bk��\��`�7xn⏍�'�K�Ǻ̡�) !��H#�4?W��ژS�Ҥ�$�S�$.�u�qK��u�T*�w�4������� ��W�KJ�9(�~8��.�j���u
�-	��<>��(6Tu[J"�Kݡ�m��LEC]��a���R�s�1�Z���ߴ���p�L�0��'�h=}����p�ElT /�
�oM�~���!�SI��o��5OkFo¾v���t&5������$|�K�4�� �  gz�w�()�K�m�$*X��sv�(u�S��Ŷ
%+�N�9S����c�/��1�v�7�Ye&[B/�Y�d^�+���#5K׎}��^��T:�fYd�g:
��¡�d��M��T�*i�ۓz�[��@��f����p�x�u��A�G�hׯ^��ꤳ]��������{�d�����Y���ʍ~�2���晚 /�w]0�=�NȆAp�SNiD3�.�>�)$����i�@�a�5V_�����B�g�[�q��Ad�M�4�Z���\�S��z�~)"�i�����[��#VX�Ǔ�kl�>iL��.��駜�ɷѺz|���}�?�q*���Nn��J%;��6��h
^��<<Uu&���.�3/�� tW6N��q�?��_ ?�% Qմ���� �0>p�Bؑ�d�qra2��1M��~\����6\�>tl#@�`�_n;flmҏ �'�dzu��p�h=�:���>ȵ�9�)9��|1g<{�c�'�}i�Ô=U�T2]�54�a7�	$̍:�i���>�k�pD��0��A���0�S�Fj���2�T�q�����#}d�i7�BGN��cg��d?r�%��^�Kf����PYS.J�Y�d$��`s��6����f���5��^��lb��s�]��C����E�"���9�����l�I���$z" @�8��T� ���k.�lk��"֥%�kF1�=B���^ԁ���[���QaQ�h/�e�&��~~@	�t�����+E�����M��p�'�)����i���6��� 0�F{�q�i8N�"p"�~ p���Ŗ�銁)�J%�	fJ�M�b滕���Nާ�м�ɏ��N�1�z��1��.y1�gqB�>h�5s�ڔ�}�KOָ0�d.��՜�p�t�~��mJY#̘�~��㍃�xj�{���s�u[�R��H㰞�5��`�v�X� �H�S�. ���Ǡ>(�=�:�����N앒7r�x)�3��+�x�á.�����ה���-f�ws(�����ɰ#���x����NeC��y�e�&�dE�b�j���0Z^W���,[��,��:o�&w�6�'���|cT,���c��{Jw'�M�e`����r�灱!�>&5�ţ�k��0b���y���*Z�Vx�V���Q05�m|_�{��=ϬI���zB?-v3�OP�M�kk�u�L��B̔��Ԑ>?Y�s�/�8�qާ�w�B^��W�-����\EP�7�r��.��	��S�=څ,���.C�)Y0�C�'�xJ��4���e,�A�pv�j��xRO�F�6�sCK�m�'�Gg��4X癩�^f���^}�z�=���ؾ���-�j/�t;�s\����Ѥ(�]�YQUW;m|���F4��<�T� ��f��)w��Bw���,����zڷ���G��(��Y��@��s�~v�?�/�N�͂�2|�H�����xa��u��� �F�M�����/�
������ރ�������z���:����m�nf��^�>	'�?�C�h��'M\��X=HƖ�G�~�N�^�+�[w�`T��ܓ_w�|��1��]�q_�Y��*�Z��PCo6$l�ϛtدS���,Gޱp�c���
�����X��{��53${���'���m���3<[>�p�f�IܶE�O|�H�܌%؟��&|A6<�HzJ�"�K;T�וs��X�%(��y���o�\�kc����n��9���Kw=12Jl�J��X��q�]��t������h_пY�;e�Yc��Bc b�q����O�&U���7uF�߭��)��Fn%�Je���ݑ��`�c��Asܺ��MFwp{�t+z3�w5���0�U�i[���+b��WJ�}�)<p,w�ěLB�{r�4�%����g7a�y8V�e�P���smTT��;�5_�t�f�����J�Ra:��g�(~@/��5��=�$�Y33�~z����P�ͷAM�~����,+��))�[O��Ko�a_?����SY�4i`�L1%c�*�I1:�2��u�֥�`����6GL�&��}�u�)��qq�_��y�}	���N#��([}��;/m��4���7�B�]Bf�GL�k��I�T�YAhK����ivO��)ٗ��2��ѫ0G���ϴ{j��u�c~�}���⍑���ٺ�D'�60{�J���;�9�Z�4i�H�9tC���fk���>��R�b}�tS/�2�Ƒi�=9�/؜���10�����`V�h�*g���7NG���k^ŋ�,��^B9��i�;VK4�YR+��Lx�h	�"����=� @�) !7�Ϯ-��Ш�&�E3Ϟ؆z&.���}�VF��f E��$�_1�w��e�#Z�S�mv�ͤ��p�ڿ%��IKpt�5Y��5t�3��|3ŪG�L��ˈqW	g��	��d@EDvQ��J�$x-�4�s��v���l�w^�s����:����%x@I� }��d�c��qK?ZF/ʧ��~`h3y��Ye��BE�?�3�/�n[�`�aW
<�	<�>�>iB��DD)?ei
�&�0͆,���˗A�h}�vL&���e��������֕K���׊��0X�S�}����w]�
9u�>{���G��2-��V0�3j:��n�ԯ�~�/�O{h�:mO#i�Y�O3� ���� �`:��ӭt$?U��J�rm߳��,�{'W����ֈ-kl�s���;"�������^���!S��Ng��
ܳ����MSHS���`tI��)_��G�W��S��_��1��q����h�T�eAF�'߿J�[0��i���ā,Gf�iJ�͗��u����?CĲ"�����fGbH���2h��H�X�f���������yK�*����R�6@�M�<�n�B���G�<�B/a����e���Wf��`>�k1��&E�w�Si{J��a%����Ci��ֵ�$~/��*����X�0��Aj�@��z.��[o�f����|-_��kuY�t4���wќڧm���C� �}����m�U�]ʔ����/.�QM,�0�(8�3�ǋ�N�Z,ڜ@؆��)K�'*�Z8/ג�/�F�:�m��W4Wb��o�[� ;|�Ig̵J3����z�m(��C�T<�v�gz���3�=����{�yʂf���c
D|u^���9|�������2HSZ/w.��Ji,w����+���>l=g�4�ɚv�l:��������<Ȇ���'���W��~�����L��n!���d:6�c{�����ݘݑ�6V��?W�AEuKg(!��Ü����x-�Hz${s���m��W�g��iu#�W�Qr��y�X�ݣ�ߤ�Sev0	���A�L�*:O��|�f�4m�&�y;�r������߽(�m��y�z�A.���W�����u��ɿ��/G �����Wt��S~��!�p�~���퍤�=q�'�b��A��G��Jm]��/+���A~25�E ��L��L�鑦M�XA����A�Z2Z�R�fz
�@��G�����6P���C���PğH'Z{�e�n	e�|ǒX����yԫ�����n���񦓠��G�6��B�:h^mVf[��T�>��Z���I�CZk/�	��K5��1�[�^C�W*�oMi���ś�&�ֳ|� �VYSy���	�n�����R`���W����g����+	����C�X�wb�mb�ە��?d��+2��NۯO�-��B�6�w��M�y�͹U�-?�}?���.���t�p|:�Ηw@���L�6����G+y/��C�|������9&�g��/�8�}�ky�nW�H�����)m�n�a�����y��t�n�z�%N!��1�F������K�t)��k��8��̻L����p����U�����l��m�zFy��o�q\�����s�R��U�K�u��f:h�A;{��l�h�����A}غ��f��O���+�3�W�iMą�h�C���(O�� �g_>�7��9���}�E�d�{�&w�{�a$]3��#0�������� �T�     