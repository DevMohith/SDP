PGDMP      #    	            |           SDP    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    SDP    DATABASE     x   CREATE DATABASE "SDP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE "SDP";
                postgres    false            �            1259    17041    overdue_fines    TABLE     .  CREATE TABLE public.overdue_fines (
    fines_id integer NOT NULL,
    checkout_id integer NOT NULL,
    fine double precision NOT NULL,
    days integer NOT NULL,
    createtime timestamp without time zone,
    updatetime timestamp without time zone,
    paid_status boolean DEFAULT false NOT NULL
);
 !   DROP TABLE public.overdue_fines;
       public         heap    postgres    false            �            1259    17040    overdue_fines_fines_id_seq    SEQUENCE     �   CREATE SEQUENCE public.overdue_fines_fines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.overdue_fines_fines_id_seq;
       public          postgres    false    219            �           0    0    overdue_fines_fines_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.overdue_fines_fines_id_seq OWNED BY public.overdue_fines.fines_id;
          public          postgres    false    218            V           2604    17044    overdue_fines fines_id    DEFAULT     �   ALTER TABLE ONLY public.overdue_fines ALTER COLUMN fines_id SET DEFAULT nextval('public.overdue_fines_fines_id_seq'::regclass);
 E   ALTER TABLE public.overdue_fines ALTER COLUMN fines_id DROP DEFAULT;
       public          postgres    false    218    219    219            �          0    17041    overdue_fines 
   TABLE DATA           o   COPY public.overdue_fines (fines_id, checkout_id, fine, days, createtime, updatetime, paid_status) FROM stdin;
    public          postgres    false    219   4       �           0    0    overdue_fines_fines_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.overdue_fines_fines_id_seq', 207, true);
          public          postgres    false    218            Y           2606    17047     overdue_fines overdue_fines_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.overdue_fines
    ADD CONSTRAINT overdue_fines_pkey PRIMARY KEY (fines_id);
 J   ALTER TABLE ONLY public.overdue_fines DROP CONSTRAINT overdue_fines_pkey;
       public            postgres    false    219            [           2606    17061     overdue_fines unique_checkout_id 
   CONSTRAINT     b   ALTER TABLE ONLY public.overdue_fines
    ADD CONSTRAINT unique_checkout_id UNIQUE (checkout_id);
 J   ALTER TABLE ONLY public.overdue_fines DROP CONSTRAINT unique_checkout_id;
       public            postgres    false    219            \           2606    17053 ,   overdue_fines overdue_fines_checkout_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.overdue_fines
    ADD CONSTRAINT overdue_fines_checkout_id_fkey FOREIGN KEY (checkout_id) REFERENCES public.checkouts_by_title(checkout_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.overdue_fines DROP CONSTRAINT overdue_fines_checkout_id_fkey;
       public          postgres    false    219            �   F   x�]ɻ�@�����-+?�c�/Ac'�Ņ�9=�]E����Z~����-�����2���<z����Z=     