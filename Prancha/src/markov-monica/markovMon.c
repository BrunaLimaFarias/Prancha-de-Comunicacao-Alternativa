/*
Teclado Virtual Livre
Copyright (C) 2005 Percy Nohama <percy@ppgia.pucpr.br>

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
*/

// TecladoVirtualDlg.cpp : implementation file
//
#include "stdafx.h" 
#include "TecladoVirtual.h"
#include "TecladoVirtualDlg.h" 
#include "OpcaoDlg.h" 
#include "UsuarioDlg.h"

// Sintetizador de voz #include <mmsystem.h> #include <initguid.h> #include <objerror.h>

#ifdef DIRECTSOUND
#include <dsound.h> #endif // DIRECTSOUND

#include "c:\speech.h"

ITTSCentral *pITTSCentral; IAudioMultiMediaDevice *pIAMM;

#ifdef _DEBUG
#define new DEBUG_NEW #undef THIS_FILE
static char THIS_FILE[] =   FILE ; #endif

///////////////////////////////////////////////////////////////////////////////////
////
//****** MATRIZEz E VARIÁVEIS DECLARADAS PARA A PREDIÇÃO POR HMM******
const double VetorPi[NumeroDeClasses] =
//Cola-se aqui a Matriz Pi criada pelas rotinas Visual Basic do Excel

const double MatrizA[NumeroDeClasses][NumeroDeClasses] =
//Cola-se aqui a Matriz A criada pelas rotinas Visual Basic do Excel

struct NProvaveisPalavras{
int NPalavras;
double Probabilidade [maxNumPalavrasPorClasse];
};

const struct NProvaveisPalavras MatrizB1[NumeroDeClasses] =
//Cola-se aqui a Matriz B1 criada pelas rotinas Visual Basic do Excel

struct ClPoPrB
{
int indClasse;
int PosiB;
};

const struct MatrizInvertida
{
char Palavra [maiorPalavraDoCorpus];
int nClasses;
ClPoPrB parB [numClassesDaPalavra];
} MatrizDeBusca[numPalavrasDiferentes] =
//Cola-se aqui a Matriz de Busca criada pelas rotinas Visual Basic do Excel

///////////////////////////////////////////////////////////////////////////////////
////// Se houve necessidadde de alteração do tamanho das listas as seguir, alterar o valor di fimDalista TecladoVirtualDlg.h

struct LinhaPred
{
int LinMtzBusca;
double Resultado;
};

struct ListaDePredicao
{
struct LinhaPred lstPred[fimDaLista+1];
int classe[numClassesDaPalavra];
double delta[numClassesDaPalavra];
} mtzPred[nPalavrasNoParagrafo+1];

int indPred=0;

/////////////////////////////////////////////////////////////////////////////
// CAboutDlg dialog used for App About

class CAboutDlg : public CDialog
{
public: CAboutDlg();
// Dialog Data
//{{AFX_DATA(CAboutDlg)
enum { IDD = IDD_ABOUTBOX };
//}}AFX_DATA

// ClassWizard generated virtual function overrides
//{{AFX_VIRTUAL(CAboutDlg)
protected:
virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support
//}}AFX_VIRTUAL

// Implementation
protected:
//{{AFX_MSG(CAboutDlg)
//}}AFX_MSG
DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialog(CAboutDlg::IDD)
{
//{{AFX_DATA_INIT(CAboutDlg)
//}}AFX_DATA_INIT
}
//*********************************************************************************

****
void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
//************************************************************
// Associa o ID dos componentes gráficos com a variável	*
//************************************************************
CDialog::DoDataExchange(pDX);
//{{AFX_DATA_MAP(CAboutDlg)
//}}AFX_DATA_MAP
}
BEGIN_MESSAGE_MAP(CAboutDlg, CDialog)
//{{AFX_MSG_MAP(CAboutDlg)
ON_WM_DESTROY()
//}}AFX_MSG_MAP
END_MESSAGE_MAP()
////////////////////////////////////////////////////////////////////////////
// CTecladoVirtualDlg dialog
CTecladoVirtualDlg::CTecladoVirtualDlg(CWnd* pParent /*=NULL*/)
: CDialog(CTecladoVirtualDlg::IDD, pParent)
{
//{{AFX_DATA_INIT(CTecladoVirtualDlg)
m_vedit1 = _T(""); m_veditContaClique = 0;
m_veditTempoClique = 0;
//}}AFX_DATA_INIT
// Note that LoadIcon does not require a subsequent DestroyIcon in Win32
m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::DoDataExchange(CDataExchange* pDX)
{
//************************************************************
// Associa o ID dos componentes gráficos com a variável	*
//************************************************************
CDialog::DoDataExchange(pDX);
//{{AFX_DATA_MAP(CTecladoVirtualDlg) DDX_Control(pDX, IDC_BUTTON44, m_cButtonTempoClique); DDX_Control(pDX, IDC_BUTTON10, m_cButtonContaClique); DDX_Control(pDX, IDC_STATIC5, m_cStaticContaClique); DDX_Control(pDX, IDC_STATIC4, m_cStaticTempoClique); DDX_Control(pDX, IDC_EDIT3, m_cEditTempoClique); DDX_Control(pDX, IDC_EDIT4, m_cEditContaClique); DDX_Text(pDX, IDC_EDIT3, m_veditContaClique); DDX_Text(pDX, IDC_EDIT4, m_veditTempoClique); DDX_Control(pDX, IDC_STATIC3, m_focus); DDX_Control(pDX, IDC_BUTTON8, m_b8); DDX_Control(pDX, IDC_BUTTON9, m_b9); DDX_Control(pDX, IDC_BUTTON7, m_b7); DDX_Control(pDX, IDC_LIST3, m_clist3); DDX_Control(pDX, IDC_LIST1, m_clist1); DDX_Control(pDX, IDC_EDIT1, m_cedit1); DDX_Control(pDX, IDCANCEL, m_bfechar); DDX_Control(pDX, IDC_BUTTON1, m_b1); DDX_Control(pDX, IDC_BUTTON2, m_b2); DDX_Control(pDX, IDC_BUTTON3, m_b3); DDX_Control(pDX, IDC_BUTTON4, m_b4); DDX_Control(pDX, IDC_BUTTON5, m_b5); DDX_Control(pDX, IDC_BUTTON11, m_b11); DDX_Control(pDX, IDC_BUTTON12, m_b12); DDX_Control(pDX, IDC_BUTTON13, m_b13); DDX_Control(pDX, IDC_BUTTON14, m_b14); DDX_Control(pDX, IDC_BUTTON15, m_b15); DDX_Control(pDX, IDC_BUTTON16, m_b16); DDX_Control(pDX, IDC_BUTTON17, m_b17); DDX_Control(pDX, IDC_BUTTON18, m_b18); DDX_Control(pDX, IDC_BUTTON19, m_b19); DDX_Control(pDX, IDC_BUTTON20, m_b20);

DDX_Control(pDX, IDC_BUTTON21, m_b21); DDX_Control(pDX, IDC_BUTTON22, m_b22); DDX_Control(pDX, IDC_BUTTON23, m_b23); DDX_Control(pDX, IDC_BUTTON24, m_b24); DDX_Control(pDX, IDC_BUTTON25, m_b25); DDX_Control(pDX, IDC_BUTTON26, m_b26); DDX_Control(pDX, IDC_BUTTON27, m_b27); DDX_Control(pDX, IDC_BUTTON28, m_b28); DDX_Control(pDX, IDC_BUTTON29, m_b29); DDX_Control(pDX, IDC_BUTTON30, m_b30); DDX_Control(pDX, IDC_BUTTON31, m_b31); DDX_Control(pDX, IDC_BUTTON32, m_b32); DDX_Control(pDX, IDC_BUTTON33, m_b33); DDX_Control(pDX, IDC_BUTTON34, m_b34); DDX_Control(pDX, IDC_BUTTON35, m_b35); DDX_Control(pDX, IDC_BUTTON36, m_b36); DDX_Control(pDX, IDC_BUTTON37, m_b37); DDX_Control(pDX, IDC_BUTTON38, m_b38); DDX_Control(pDX, IDC_BUTTON39, m_b39); DDX_Control(pDX, IDC_BUTTON40, m_b40); DDX_Control(pDX, IDC_BUTTON41, m_b41); DDX_Control(pDX, IDC_BUTTON42, m_b42); DDX_Control(pDX, IDC_BUTTON43, m_b43); DDX_Text(pDX, IDC_EDIT1, m_vedit1);
//}}AFX_DATA_MAP
}
//*********************************************************************************
****
BEGIN_MESSAGE_MAP(CTecladoVirtualDlg, CDialog)
//************************************************************
//* Associa o ID dos componentes gráficos com a função	*
//************************************************************
//{{AFX_MSG_MAP(CTecladoVirtualDlg)
ON_WM_SYSCOMMAND() ON_WM_PAINT() ON_WM_QUERYDRAGICON()
ON_BN_CLICKED(IDC_BUTTON10, OnContaClique) ON_BN_CLICKED(IDC_BUTTON44, OnTempoClique) ON_LBN_SELCHANGE(IDC_LIST1, OnHistorico) ON_LBN_SELCHANGE(IDC_LIST3, OnBotao) ON_BN_CLICKED(IDC_BUTTON1, OnBotao) ON_BN_CLICKED(IDC_BUTTON2, OnBotao) ON_BN_CLICKED(IDC_BUTTON3, OnBotao) ON_BN_CLICKED(IDC_BUTTON4, OnBotao) ON_BN_CLICKED(IDC_BUTTON5, OnBotao) ON_BN_CLICKED(IDC_BUTTON7, OnBotao) ON_BN_CLICKED(IDC_BUTTON8, Outras) ON_BN_CLICKED(IDC_BUTTON9, Outras) ON_BN_CLICKED(IDC_BUTTON11, OnBotao) ON_BN_CLICKED(IDC_BUTTON12, OnBotao) ON_BN_CLICKED(IDC_BUTTON13, OnBotao) ON_BN_CLICKED(IDC_BUTTON14, OnBotao) ON_BN_CLICKED(IDC_BUTTON15, OnBotao) ON_BN_CLICKED(IDC_BUTTON16, OnBotao) ON_BN_CLICKED(IDC_BUTTON17, OnBotao) ON_BN_CLICKED(IDC_BUTTON18, OnBotao) ON_BN_CLICKED(IDC_BUTTON19, OnBotao) ON_BN_CLICKED(IDC_BUTTON20, OnBotao) ON_BN_CLICKED(IDC_BUTTON21, OnBotao) ON_BN_CLICKED(IDC_BUTTON22, OnBotao) ON_BN_CLICKED(IDC_BUTTON23, OnBotao) ON_BN_CLICKED(IDC_BUTTON24, OnBotao) ON_BN_CLICKED(IDC_BUTTON25, OnBotao) ON_BN_CLICKED(IDC_BUTTON26, OnBotao) ON_BN_CLICKED(IDC_BUTTON27, OnBotao) ON_BN_CLICKED(IDC_BUTTON28, OnBotao) ON_BN_CLICKED(IDC_BUTTON29, OnBotao) ON_BN_CLICKED(IDC_BUTTON30, OnBotao)

ON_BN_CLICKED(IDC_BUTTON31, OnBotao) ON_BN_CLICKED(IDC_BUTTON32, OnBotao) ON_BN_CLICKED(IDC_BUTTON33, OnBotao) ON_BN_CLICKED(IDC_BUTTON34, OnBotao) ON_BN_CLICKED(IDC_BUTTON35, OnBotao) ON_BN_CLICKED(IDC_BUTTON36, OnBotao) ON_BN_CLICKED(IDC_BUTTON37, OnBotao) ON_BN_CLICKED(IDC_BUTTON38, OnBotao) ON_BN_CLICKED(IDC_BUTTON39, OnBotao) ON_BN_CLICKED(IDC_BUTTON40, OnBotao) ON_BN_CLICKED(IDC_BUTTON41, OnBotao) ON_BN_CLICKED(IDC_BUTTON42, OnBotao) ON_BN_CLICKED(IDC_BUTTON43, OnBotao) ON_BN_CLICKED(IDC_BUTTON43, OnBotao) ON_LBN_SELCHANGE(IDCANCEL, OnBotao) ON_WM_TIMER()
ON_WM_DESTROY()
//}}AFX_MSG_MAP
END_MESSAGE_MAP()
/////////////////////////////////////////////////////////////////////////////
// CTecladoVirtualDlg message handlers
//*********************************************************************************
****
BOOL CTecladoVirtualDlg::OnInitDialog()
{
CDialog::OnInitDialog();
// Add "About..." menu item to system menu.
// IDM_ABOUTBOX must be in the system command range. ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX); ASSERT(IDM_ABOUTBOX < 0xF000);
CMenu* pSysMenu = GetSystemMenu(false);
if (pSysMenu != NULL)
{
CString strAboutMenu; strAboutMenu.LoadString(IDS_ABOUTBOX); if (!strAboutMenu.IsEmpty())
{
pSysMenu->AppendMenu(MF_SEPARATOR);
pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
}
}
// Set the icon for this dialog. The framework does this automatically
// when the application's main window is not a dialog SetIcon(m_hIcon, true);	// Set big icon SetIcon(m_hIcon, false);	// Set small icon


//***********************
// Início do Teclado *
//***********************

//** Conta Clique
altContaClique=50;

//Cálculo do VetorPi
Predicao();

//Identifica usuário
ConfUsuarios("");

//Redimenciona a tela CRect rect,rect2; GetWindowRect( rect );
GetDesktopWindow()->GetWindowRect( &rect2);

int topo=(rect2.Height()/2)-(rect.Height()/2);
int esq=(rect2.Width()/2)-(rect.Width()/2);

::SetWindowPos(m_hWnd,HWND_TOPMOST,esq,topo,rect.Width(),rect.Height(),SWP_SHOWWIND OW);
//Abre as configurações
m_dir=1; h=10,v=10;
if(config.varredura==true)SetTimer(1,config.velo*100,0);
return true; // return true unless you set the focus to a control
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnDestroy()
{
//***********************
// sai do aplicativo *
//***********************
CDialog::OnDestroy();
// Fecha o sintetizador
SintetizadorFechar();
// Salva a configuração
ConfSalvar();
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
if ((nID & 0xFFF0) == IDM_ABOUTBOX)
{
CAboutDlg dlgAbout; dlgAbout.DoModal();
}
else
{
CDialog::OnSysCommand(nID, lParam);
}
}
// If you add a minimize button to your dialog, you will need the code below
// to draw the icon. For MFC applications using the document/view model,
// this is automatically done for you by the framework.
//*********************************************************************************
****
void CTecladoVirtualDlg::OnPaint()
{
if (IsIconic())
{
CPaintDC dc(this); // device context for painting
SendMessage(WM_ICONERASEBKGND, (WPARAM) dc.GetSafeHdc(), 0);
// Center icon in client rectangle
int cxIcon = GetSystemMetrics(SM_CXICON); int cyIcon = GetSystemMetrics(SM_CYICON); CRect rect;
GetClientRect(&rect);
int x = (rect.Width() - cxIcon + 1) / 2;
int y = (rect.Height() - cyIcon + 1) / 2;
// Draw the icon
dc.DrawIcon(x, y, m_hIcon);
}
else
{
CDialog::OnPaint();
}
}
// The system calls this to obtain the cursor to display while the user drags
// the minimized window.
HCURSOR CTecladoVirtualDlg::OnQueryDragIcon()
{
return (HCURSOR) m_hIcon;
}
//*********************************************************************************

****
BOOL CTecladoVirtualDlg::PreTranslateMessage(MSG* pMsg)
{
//*******************************
// Captura o clique do teclado *
//*******************************
// Exibe a ajuda
if(config.varredura==false && pMsg->message == WM_KEYDOWN && pMsg->wParam== VK_F1){
WinExec("hh.exe ""./AjudaTeclado.chm" ,SW_SHOW);
}
// Toque no teclado
if(config.varredura==true){
if (pMsg->message == WM_CHAR && m_dir==2) { KillTimer(1);
m_dir=0; m_clist1.SetFocus(); m_dir=1;
SetTimer(1,config.velo*100,0);
// Aciona o clique do mouse
if(v!=15){
mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
}
else OnBotao(); h=10;
v=10;
CRect r; GetWindowRect(r);
SetCursorPos(r.left,r.top); m_clist1.SetFocus();
}
else if (pMsg->message == WM_CHAR && m_dir==1) {
// Altera o sentido da varredura
m_dir=2;
}
}
return CDialog::PreTranslateMessage(pMsg);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::Interface(HWND hParentWnd, CRect &rect)
{
//*******************************
// Organiza as teclas na tela *
//*******************************
int d=2; // Recuo direito int j=2; // Recuo de topo int m=39; // Largura do botao int n=25; // Altura do botao int e=32;
int x=2; int alt=250; int lar=590;
// Título da janela
SetWindowText("Teclado Virtual Livre - Usuário:"+m_usuario);
// Tamanho das letras
LOGFONT lf;memset(&lf, 0, sizeof(lf));lf.lfHeight = -11;
LOGFONT lf2;memset(&lf2, 0, sizeof(lf2));lf2.lfHeight = -16;
// Ajusta o tamanho das listas
if (config.tamanho==1){
d=2; j=2; m=29; n=19; e=24; x=2;
lf.lfHeight =-9;
lf2.lfHeight =-11;
if(config.historico==1 ){
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,320,61,NULL); m_clist3.SetWindowPos(NULL,322,2,113,142,NULL);

m_cedit1.SetWindowPos(NULL,2,65,320,18,NULL); j=87;
alt=190+altContaClique; lar=442;
}
else {
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,0,0,NULL); m_clist3.SetWindowPos(NULL,322,2,113,73,NULL); m_cedit1.SetWindowPos(NULL,2,2,320,18,NULL); j=22;
alt=125+altContaClique; lar=442;
}
}
if (config.tamanho==2){
d=2; j=2; m=39;	n=25;	e=32; x=2;
lf.lfHeight = -11;
lf2.lfHeight = -16;
if(config.historico==1){
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,430,83,NULL); m_clist3.SetWindowPos(NULL,435,2,148,193,NULL); m_cedit1.SetWindowPos(NULL,2,89,430,25,NULL); j=119;
alt=250+altContaClique; lar=590;
}
else {
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,0,0,NULL); m_clist3.SetWindowPos(NULL,435,2,148,100,NULL); m_cedit1.SetWindowPos(NULL,2,2,430,25,NULL); j=29;
alt=160+altContaClique; lar=590;
}
}
if (config.tamanho==3){
d=2; j=2; m=49;	n=31;	e=40; x=2;
lf.lfHeight = -13;
lf2.lfHeight = -21;
if(config.historico==1){
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,540,105,NULL); m_clist3.SetWindowPos(NULL,548,2,183,244,NULL); m_cedit1.SetWindowPos(NULL,2,110,540,32,NULL); j=151;
alt=310+altContaClique; lar=738;
}
else {
//(NULL,recuo esq,topo,largura,alt) m_clist1.SetWindowPos(NULL,2,2,540,0,NULL); m_clist3.SetWindowPos(NULL,548,2,183,131,NULL); m_cedit1.SetWindowPos(NULL,2,2,540,32,NULL); j=37;
alt=195+altContaClique; lar=738;
}
}
// Conta Clique -- Ordena na tela m_cStaticTempoClique.SetWindowPos(NULL,20,alt-60,50,40,NULL); m_cEditContaClique.SetWindowPos(NULL,100,alt-60,50,20,NULL); m_cStaticContaClique.SetWindowPos(NULL,160,alt-60,50,40,NULL); m_cEditTempoClique.SetWindowPos(NULL,220,alt-60,50,20,NULL); m_cButtonTempoClique.SetWindowPos(NULL,300,alt-60,50,20,NULL); m_cButtonContaClique.SetWindowPos(NULL,360,alt-60,50,20,NULL);

// ordena as letras do teclado
if (config.formato=="abcde"){ FormatoABC();
}
else
FormatoQWE();
strcpy(lf2.lfFaceName, "Times New Roman"); strcpy(lf.lfFaceName, "Arial");
CFont *fonte2 = new CFont(); fonte2->CreateFontIndirect(&lf2);
CFont *fonte = new CFont();
fonte->CreateFontIndirect(&lf);
// Adiciona as fontes
m_clist3.SetFont(fonte2); m_clist1.SetFont(fonte2);m_cedit1.SetFont(fonte2); m_b1.SetFont(GetFont());m_b2.SetFont(fonte);m_b3.SetFont(fonte); m_b4.SetFont(fonte);m_b5.SetFont(fonte);m_b7.SetFont(fonte); m_b8.SetFont(fonte);m_b9.SetFont(fonte);m_b11.SetFont(fonte); m_b12.SetFont(fonte);m_b13.SetFont(fonte);m_b14.SetFont(fonte); m_b15.SetFont(fonte);m_b16.SetFont(fonte);m_b17.SetFont(fonte); m_b18.SetFont(fonte);m_b19.SetFont(fonte);m_b20.SetFont(fonte); m_b21.SetFont(fonte);m_b22.SetFont(fonte);m_b23.SetFont(fonte); m_b24.SetFont(fonte);m_b25.SetFont(fonte);m_b26.SetFont(fonte); m_b27.SetFont(fonte);m_b28.SetFont(fonte);m_b29.SetFont(fonte); m_b30.SetFont(fonte);m_b31.SetFont(fonte);m_b32.SetFont(fonte); m_b33.SetFont(fonte);m_b34.SetFont(fonte);m_b35.SetFont(fonte); m_b36.SetFont(fonte);m_b37.SetFont(fonte);m_b38.SetFont(fonte); m_b39.SetFont(fonte);m_b40.SetFont(fonte);m_b41.SetFont(fonte); m_b42.SetFont(fonte);m_b43.SetFont(fonte);m_bfechar.SetFont(fonte);
// Ajusta a posição dos botões
// Move a janela
::MoveWindow(hParentWnd,rect.left,rect.top,lar+5,alt+5,true);
//::MoveWindow(hParentWnd,esq	,topo,lar	,alt	, true);
// Primeira fila
j+=x;
m_b1.SetWindowPos(NULL,d,j-2,m+e,n,NULL); m_b2.SetWindowPos(NULL,d+e+m,j-2,m+e,n,NULL); m_b3.SetWindowPos(NULL,d+2*(m+e),j-2,m+e,n,NULL); m_b4.SetWindowPos(NULL,d+3*(m+e),j-2,m+e,n,NULL); m_b5.SetWindowPos(NULL,d+4*(m+e),j-2,m+e,n,NULL);
// Segunda fila
j+=n+x; m_b11.SetWindowPos(NULL,d,j,m,n,NULL); m_b12.SetWindowPos(NULL,d+m,j,m,n,NULL); m_b13.SetWindowPos(NULL,d+2*m,j,m,n,NULL); m_b14.SetWindowPos(NULL,d+3*m,j,m,n,NULL); m_b15.SetWindowPos(NULL,d+4*m,j,m,n,NULL); m_b16.SetWindowPos(NULL,d+5*m,j,m,n,NULL); m_b17.SetWindowPos(NULL,d+6*m,j,m,n,NULL); m_b18.SetWindowPos(NULL,d+7*m,j,m,n,NULL); m_b19.SetWindowPos(NULL,d+8*m,j,m,n,NULL); m_b20.SetWindowPos(NULL,d+9*m,j,m,n,NULL); m_b41.SetWindowPos(NULL,d+10*m,j,m,n,NULL);
// 3a.
m_b21.SetWindowPos(NULL,d,j+n,m,n,NULL); m_b22.SetWindowPos(NULL,d+m,j+n,m,n,NULL); m_b23.SetWindowPos(NULL,d+2*m,j+n,m,n,NULL); m_b24.SetWindowPos(NULL,d+3*m,j+n,m,n,NULL); m_b25.SetWindowPos(NULL,d+4*m,j+n,m,n,NULL); m_b26.SetWindowPos(NULL,d+5*m,j+n,m,n,NULL); m_b27.SetWindowPos(NULL,d+6*m,j+n,m,n,NULL); m_b28.SetWindowPos(NULL,d+7*m,j+n,m,n,NULL); m_b29.SetWindowPos(NULL,d+8*m,j+n,m,n,NULL); m_b30.SetWindowPos(NULL,d+9*m,j+n,m,n,NULL); m_b42.SetWindowPos(NULL,d+10*m,j+n,m,n,NULL);
// 4a.
m_b31.SetWindowPos(NULL,d,j+2*n,m,n,NULL); m_b32.SetWindowPos(NULL,d+m,j+2*n,m,n,NULL); m_b33.SetWindowPos(NULL,d+m*2,j+2*n,m,n,NULL);

m_b34.SetWindowPos(NULL,d+m*3,j+2*n,m,n,NULL); m_b35.SetWindowPos(NULL,d+m*4,j+2*n,m,n,NULL); m_b36.SetWindowPos(NULL,d+m*5,j+2*n,m,n,NULL); m_b37.SetWindowPos(NULL,d+m*6,j+2*n,m,n,NULL); m_b38.SetWindowPos(NULL,d+m*7,j+2*n,m,n,NULL); m_b39.SetWindowPos(NULL,d+m*8,j+2*n,m,n,NULL); m_b40.SetWindowPos(NULL,d+m*9,j+2*n,m,n,NULL); m_b43.SetWindowPos(NULL,d+10*m,j+2*n,m,n,NULL); m_b9.SetWindowPos(NULL,d+11*m,j+2*n,m,n,NULL); m_b8.SetWindowPos(NULL,d+12*m,j+2*n,m,n,NULL); m_b7.SetWindowPos(NULL,d+13*m,j+2*n,m,n,NULL); m_bfechar.SetWindowPos(NULL,d+14*m,j+2*n,m,n,NULL);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::ConfUsuarios(CString usuario)
{
//***************************************
// Abre as configurações do config.ini *
//***************************************
// Abre a janela de usuários
char buf[1000];
::GetModuleFileName(AfxGetApp()->m_hInstance, buf, sizeof(buf)); diretorio=buf; diretorio.Delete(diretorio.ReverseFind('\\')+1,diretorio.GetLength()-
diretorio.ReverseFind('\\')-1); HWND hWnd;
CRect rect;
// Se o usuario não for selecionado
if(usuario.GetLength()==0){ CUsuarioDlg a; a.DoModal(); if(a.m_caminho=="")
m_usuario="Padrão";
else
m_usuario=a.m_caminho;
SetWindowText("Teclado Virtual Livre - Usuário:"+m_usuario); hWnd=::GetActiveWindow();
GetWindowRect(&rect);
}
else {
m_usuario=usuario; HWND hChildWnd;
hChildWnd=::GetActiveWindow(); hWnd=::GetParent(hChildWnd); GetWindowRect(&rect);
}
// Abre as configurações do usuário
CFile arquivo; CString tex;
CString caminho=m_usuario; caminho=".\\"+caminho; caminho+="\\config.ini"; TCHAR temp[500] = {0};
GetPrivateProfileString("Configurações	do	Teclado Virtual","autoclick","0",temp,500,caminho);
config.autoclick=atoi(temp);
GetPrivateProfileString("Configurações do Teclado Virtual","delay"	,"4"
,temp,500,caminho); config.delay=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","formato"
,"abcde",temp,500,caminho); config.formato=temp;
GetPrivateProfileString("Configurações	do	Teclado	Virtual","externo"
,"0",temp,500,caminho); config.externo=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado Virtual","maiuscula","0",temp,500,caminho);

config.maiuscula=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","tamanho"	,"2"
,temp,500,caminho); config.tamanho=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","historico","1"
,temp,500,caminho); config.historico=atoi(temp);
//Organiza a posição das teclas na tela
Interface(hWnd,rect);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","som"
,"0",temp,500,caminho); config.som=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","voz"
,"0",temp,500,caminho); config.masculino=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado Virtual","varredura","0",temp,500,caminho);
config.varredura=atoi(temp);
GetPrivateProfileString("Configurações	do	Teclado	Virtual","velo"
,"10",temp,500,caminho); config.velo=atoi(temp); m_dir=1;
h=10,v=10;
if(config.varredura==1)SetTimer(1,config.velo*100,0);
;
}
//*********************************************************************************
****
void CTecladoVirtualDlg::ConfSalvar()
{
//*******************************************
//	Salva as configurações do arquivo *
//*******************************************
// Escreve as variáveis no arquivo
TCHAR temp[500] = {0};
CString temp2,caminho; caminho=diretorio; caminho+=m_usuario; caminho+="\\config.ini";
if(config.autoclick==1)strcpy(temp,"1"); else strcpy(temp,"0"); WritePrivateProfileString("Configurações	do	Teclado
Virtual","autoclick",temp,caminho); temp2.Format("%d",config.delay); strcpy(temp,temp2);
WritePrivateProfileString("Configurações	do	Teclado	Virtual","delay"
,temp,caminho); strcpy(temp,config.formato);
WritePrivateProfileString("Configurações	do	Teclado	Virtual","formato"
,temp,caminho);
if(config.externo==1)strcpy(temp,"1"); else strcpy(temp,"0"); WritePrivateProfileString("Configurações	do	Teclado	Virtual","externo"
,temp,caminho);
if(config.maiuscula==1)strcpy(temp,"1"); else strcpy(temp,"0"); WritePrivateProfileString("Configurações	do	Teclado
Virtual","maiuscula",temp,caminho);
if(config.historico==0)strcpy(temp,"0"); else strcpy(temp,"1"); WritePrivateProfileString("Configurações	do	Teclado
Virtual","historico",temp,caminho); temp2.Format("%d",config.tamanho); strcpy(temp,temp2);
WritePrivateProfileString("Configurações	do	Teclado	Virtual","tamanho"
,temp,caminho); temp2.Format("%d",config.som); strcpy(temp,temp2);
WritePrivateProfileString("Configurações	do	Teclado	Virtual","som"
,temp,caminho);
if(config.masculino==1)strcpy(temp,"1"); else strcpy(temp,"0"); WritePrivateProfileString("Configurações	do	Teclado	Virtual","voz"

,temp,caminho);
if(config.varredura==1)strcpy(temp,"1"); else strcpy(temp,"0"); WritePrivateProfileString("Configurações	do	Teclado	Virtual","varredura"
,temp,caminho); temp2.Format("%d",config.velo); strcpy(temp,temp2);
WritePrivateProfileString("Configurações	do	Teclado	Virtual","velo"
,temp,caminho);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnHistorico()
{
//***************************************
// Clica sobre a lista de histórico *
//***************************************
// Retira da temp e adiciona na área da frase
CString temp; char temp2[256]; char valor[256];
UpdateData(false); m_clist1.GetText(m_clist1.GetCurSel(),temp);
_tcscpy(temp2,temp);
int x=temp.ReverseFind(')');
if(x<0)x=15;
int tam=temp.GetLength(); x+=2;
int p=0;
for(int i=x;i<=tam;i++){ valor[p]=temp2[i]; p++;
}
LPTSTR temp4 = new TCHAR[tam];
_tcscpy(temp4,valor);
// Atualiza o tempo m_vedit1+=temp4; m_vedit1+=""; UpdateData(false); m_cedit1.SetFocus();
m_cedit1.SetSel(m_vedit1.GetLength(),m_vedit1.GetLength(),true);

}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnImprimir()
{
//****************************************
//* Evento de clique no botão imprimir	*
//****************************************
// Pega o texto do histórico linha por linha
CString texto,temp;
for( int i=0;i<=m_clist1.GetCount()-1;i++){ m_clist1.GetText(i,temp);
// linha com tempo
if(temp.Find("(")==0){
temp.Delete(0,temp.Find(")")+2); temp.TrimRight();
}
// linha sem tempo
else{
int b=texto.ReverseFind('\n');
int c=texto.GetLength();
if(texto.ReverseFind('\n')==texto.GetLength()-1) texto.Delete(texto.GetLength()-1,1);
temp.TrimLeft();
}
texto+=temp; texto+="\n";

}
// Adiciona o texto
texto+=m_vedit1;
// Prepara o texto para a impressão
CDC m_dc;
CPrintDialog	printDlg(false);
// Janela da impressora
if (printDlg.DoModal() == IDCANCEL)	return; m_dc.Attach(printDlg.GetPrinterDC()); m_dc.m_bPrinting = true;
DOCINFO di;
::ZeroMemory (&di, sizeof (DOCINFO)); di.cbSize = sizeof (DOCINFO);
// Título do documento.
di.lpszDocName = "Teclado Virtual";
// Começa a imprimir
if(m_dc.StartDoc( &di) > 0){
// Começa a página m_dc.StartPage(); m_dc.SetMapMode(MM_HIMETRIC);
// Adiciona o texto CRect rectTexto; rectTexto.left=1000; rectTexto.top=-1000;
rectTexto.right=18000; rectTexto.bottom =-3000;
m_dc.DrawText(texto, &rectTexto,DT_NOPREFIX | DT_WORDBREAK);
// Fim da página e do documento
m_dc.EndPage(); m_dc.EndDoc();
}
// Ocorreu um erro, cancela impressão
else m_dc.AbortDoc();
// Acaba a impresssão
m_dc.Detach();
}
//*********************************************************************************
****
void CTecladoVirtualDlg::FormatoABC()
{
//***************************************************
// ORDENA AS TECLAS SEGUINDO O ALFABETO - ABCDE *
//***************************************************
if(config.maiuscula==1){
m_b11.SetWindowText("A"); m_b12.SetWindowText("B"); m_b13.SetWindowText("C"); m_b14.SetWindowText("D"); m_b15.SetWindowText("E"); m_b16.SetWindowText("F"); m_b17.SetWindowText("G"); m_b18.SetWindowText("H"); m_b19.SetWindowText("I"); m_b20.SetWindowText("J"); m_b41.SetWindowText(",");

m_b21.SetWindowText("K"); m_b22.SetWindowText("L"); m_b23.SetWindowText("M"); m_b24.SetWindowText("N"); m_b25.SetWindowText("O"); m_b26.SetWindowText("P"); m_b27.SetWindowText("Q"); m_b28.SetWindowText("R"); m_b29.SetWindowText("S"); m_b30.SetWindowText("^"); m_b42.SetWindowText(".");

m_b31.SetWindowText("T"); m_b32.SetWindowText("U"); m_b33.SetWindowText("V"); m_b34.SetWindowText("W"); m_b35.SetWindowText("X"); m_b36.SetWindowText("Y"); m_b37.SetWindowText("Z"); m_b38.SetWindowText("´"); m_b39.SetWindowText("~"); m_b40.SetWindowText("`"); m_b43.SetWindowText("[CAPS]");
}else{
m_b11.SetWindowText("a"); m_b12.SetWindowText("b"); m_b13.SetWindowText("c"); m_b14.SetWindowText("d"); m_b15.SetWindowText("e"); m_b16.SetWindowText("f"); m_b17.SetWindowText("g"); m_b18.SetWindowText("h"); m_b19.SetWindowText("i"); m_b20.SetWindowText("j"); m_b41.SetWindowText(",");

m_b21.SetWindowText("k"); m_b22.SetWindowText("l"); m_b23.SetWindowText("m"); m_b24.SetWindowText("n"); m_b25.SetWindowText("o"); m_b26.SetWindowText("p"); m_b27.SetWindowText("q"); m_b28.SetWindowText("r"); m_b29.SetWindowText("s");

m_b30.SetWindowText("^"); m_b42.SetWindowText(".");

m_b31.SetWindowText("t"); m_b32.SetWindowText("u"); m_b33.SetWindowText("v"); m_b34.SetWindowText("w"); m_b35.SetWindowText("x"); m_b36.SetWindowText("y"); m_b37.SetWindowText("z"); m_b38.SetWindowText("´"); m_b39.SetWindowText("~"); m_b40.SetWindowText("`"); m_b43.SetWindowText("[CAPS]");
}
}
//*********************************************************************************
****

void CTecladoVirtualDlg::FormatoQWE()
{
//***********************************************
// ORDENA AS TECLAS SEGUINDO O TECLADO - QWERT *
//***********************************************
if(config.maiuscula==1){
m_b11.SetWindowText("Q"); m_b12.SetWindowText("W"); m_b13.SetWindowText("E"); m_b14.SetWindowText("R"); m_b15.SetWindowText("T"); m_b16.SetWindowText("Y"); m_b17.SetWindowText("U"); m_b18.SetWindowText("I"); m_b19.SetWindowText("O"); m_b20.SetWindowText("P"); m_b41.SetWindowText(",");

m_b21.SetWindowText("A"); m_b22.SetWindowText("S"); m_b23.SetWindowText("D"); m_b24.SetWindowText("F"); m_b25.SetWindowText("G"); m_b26.SetWindowText("H"); m_b27.SetWindowText("J"); m_b28.SetWindowText("K"); m_b29.SetWindowText("L"); m_b30.SetWindowText("^"); m_b42.SetWindowText(".");

m_b31.SetWindowText("Z"); m_b32.SetWindowText("X"); m_b33.SetWindowText("C"); m_b34.SetWindowText("V"); m_b35.SetWindowText("B"); m_b36.SetWindowText("N"); m_b37.SetWindowText("M"); m_b38.SetWindowText("´"); m_b39.SetWindowText("~"); m_b40.SetWindowText("`"); m_b43.SetWindowText("[CAPS]");
}else{
m_b11.SetWindowText("q"); m_b12.SetWindowText("w"); m_b13.SetWindowText("e"); m_b14.SetWindowText("r"); m_b15.SetWindowText("t"); m_b16.SetWindowText("y"); m_b17.SetWindowText("u"); m_b18.SetWindowText("i"); m_b19.SetWindowText("o"); m_b20.SetWindowText("p"); m_b41.SetWindowText(",");

m_b21.SetWindowText("a"); m_b22.SetWindowText("s"); m_b23.SetWindowText("d"); m_b24.SetWindowText("f"); m_b25.SetWindowText("g"); m_b26.SetWindowText("h"); m_b27.SetWindowText("j"); m_b28.SetWindowText("k"); m_b29.SetWindowText("l"); m_b30.SetWindowText("^"); m_b42.SetWindowText(".");

m_b31.SetWindowText("z"); m_b32.SetWindowText("x"); m_b33.SetWindowText("c"); m_b34.SetWindowText("v"); m_b35.SetWindowText("b"); m_b36.SetWindowText("n"); m_b37.SetWindowText("m"); m_b38.SetWindowText("´"); m_b39.SetWindowText("~"); m_b40.SetWindowText("`"); m_b43.SetWindowText("[CAPS]");
}
}
//*********************************************************************************
****

void CTecladoVirtualDlg::OnTimer(UINT nIDEvent)
{
//*******************************
// Temporizador da varredura *
//*******************************
CRect rect; GetWindowRect(&rect); m_clist1.SetFocus();
if(v==16)v=10;//volta ao chegar ao fim
CRect r; int lar=0; int alt=0;
// Leva a varredura horizontal linha por linha
if(m_dir==1){ v++;
CString a; a.Format("%d",v);

// primeira linha
if(v==11){ CRect r;
m_b1.GetWindowRect( r); SetCursorPos(r.left+r.Width()-4,r.top+r.Height()-4); m_focus.SetWindowPos(NULL,0,0,0,0,NULL); m_clist1.SetFocus();

m_b1.SetCor(RGB(255,255,0));m_b2.SetCor(RGB(255,255,0));m_b3.SetCor(RGB(255,255,0))
;



// 2a
m_b4.SetCor(RGB(255,255,0));m_b5.SetCor(RGB(255,255,0));
}

if(v==12){ CRect r;
m_b11.GetWindowRect( r); SetCursorPos(r.left+r.Width()-4,r.top+r.Height()-4);
m_b1.SetCor(GetSysColor(COLOR_BTNFACE));m_b2.SetCor(GetSysColor(COLOR_BTNFACE)); m_b3.SetCor(GetSysColor(COLOR_BTNFACE));m_b4.SetCor(GetSysColor(COLOR_BTNFACE));
m_b5.SetCor(GetSysColor(COLOR_BTNFACE));m_b11.SetCor(RGB(255,255,0));
m_b12.SetCor(RGB(255,255,0));m_b13.SetCor(RGB(255,255,0)); m_b14.SetCor(RGB(255,255,0));m_b15.SetCor(RGB(255,255,0)); m_b16.SetCor(RGB(255,255,0));m_b17.SetCor(RGB(255,255,0)); m_b18.SetCor(RGB(255,255,0));m_b19.SetCor(RGB(255,255,0)); m_b20.SetCor(RGB(255,255,0));m_b41.SetCor(RGB(255,255,0));
}
// 3a
if(v==13){ CRect r;
m_b21.GetWindowRect( r); SetCursorPos(r.left+r.Width()-4,r.top+r.Height()-4);

m_b11.SetCor(GetSysColor(COLOR_BTNFACE)); m_b12.SetCor(GetSysColor(COLOR_BTNFACE)); m_b13.SetCor(GetSysColor(COLOR_BTNFACE)); m_b14.SetCor(GetSysColor(COLOR_BTNFACE)); m_b15.SetCor(GetSysColor(COLOR_BTNFACE)); m_b16.SetCor(GetSysColor(COLOR_BTNFACE)); m_b17.SetCor(GetSysColor(COLOR_BTNFACE)); m_b18.SetCor(GetSysColor(COLOR_BTNFACE)); m_b19.SetCor(GetSysColor(COLOR_BTNFACE)); m_b20.SetCor(GetSysColor(COLOR_BTNFACE)); m_b41.SetCor(GetSysColor(COLOR_BTNFACE)); m_b21.SetCor(RGB(255,255,0));m_b22.SetCor(RGB(255,255,0)); m_b23.SetCor(RGB(255,255,0));m_b24.SetCor(RGB(255,255,0)); m_b25.SetCor(RGB(255,255,0));m_b26.SetCor(RGB(255,255,0)); m_b27.SetCor(RGB(255,255,0));m_b28.SetCor(RGB(255,255,0)); m_b29.SetCor(RGB(255,255,0));m_b30.SetCor(RGB(255,255,0)); m_b42.SetCor(RGB(255,255,0));
}
// 4a
if(v==14){ CRect r;
m_b31.GetWindowRect( r); SetCursorPos(r.left+r.Width()-4,r.top+r.Height()-4); m_b21.SetCor(GetSysColor(COLOR_BTNFACE)); m_b22.SetCor(GetSysColor(COLOR_BTNFACE)); m_b23.SetCor(GetSysColor(COLOR_BTNFACE)); m_b24.SetCor(GetSysColor(COLOR_BTNFACE)); m_b25.SetCor(GetSysColor(COLOR_BTNFACE)); m_b26.SetCor(GetSysColor(COLOR_BTNFACE)); m_b27.SetCor(GetSysColor(COLOR_BTNFACE)); m_b28.SetCor(GetSysColor(COLOR_BTNFACE)); m_b29.SetCor(GetSysColor(COLOR_BTNFACE)); m_b30.SetCor(GetSysColor(COLOR_BTNFACE)); m_b42.SetCor(GetSysColor(COLOR_BTNFACE));

m_b31.SetCor(RGB(255,255,0));m_b32.SetCor(RGB(255,255,0));m_b33.SetCor(RGB(255,255, 0)); m_b34.SetCor(RGB(255,255,0));m_b35.SetCor(RGB(255,255,0));m_b36.SetCor(RGB(255,255, 0)); m_b37.SetCor(RGB(255,255,0));m_b38.SetCor(RGB(255,255,0));m_b39.SetCor(RGB(255,255, 0)); m_b40.SetCor(RGB(255,255,0));m_b43.SetCor(RGB(255,255,0));m_b8.SetCor(RGB(255,255,0
));
m_b9.SetCor(RGB(255,255,0));m_b7.SetCor(RGB(255,255,0));m_bfechar.SetCor(RGB(255,25 5,0));
}

//5a 
if(v==15){ CRect r;m_clist3.GetWindowRect( r); m_focus.SetWindowPos(NULL,r.left-rect.left-

6,0,r.Width()+4,r.Height()+4,NULL);

m_b31.SetCor(GetSysColor(COLOR_BTNFACE));m_b32.SetCor(GetSysColor(COLOR_BTNFACE));m
_b33.SetCor(GetSysColor(COLOR_BTNFACE));

m_b34.SetCor(GetSysColor(COLOR_BTNFACE));m_b35.SetCor(GetSysColor(COLOR_BTNFACE));m
_b36.SetCor(GetSysColor(COLOR_BTNFACE));

m_b37.SetCor(GetSysColor(COLOR_BTNFACE));m_b38.SetCor(GetSysColor(COLOR_BTNFACE));m
_b39.SetCor(GetSysColor(COLOR_BTNFACE));

m_b40.SetCor(GetSysColor(COLOR_BTNFACE));m_b43.SetCor(GetSysColor(COLOR_BTNFACE));m
_b8.SetCor(GetSysColor(COLOR_BTNFACE));

m_b9.SetCor(GetSysColor(COLOR_BTNFACE));m_b7.SetCor(GetSysColor(COLOR_BTNFACE));m_b fechar.SetCor(GetSysColor(COLOR_BTNFACE));
SetCursorPos(r.left+r.Width()-4,r.top+r.Height()-4);
}
}
// Varredura Vertical
if(m_dir==2){ //Corre botão por botão
h++;
if(v==11){
m_b2.SetCor(GetSysColor(COLOR_BTNFACE));m_b3.SetCor(GetSysColor(COLOR_BTNFACE)); m_b4.SetCor(GetSysColor(COLOR_BTNFACE));m_b5.SetCor(GetSysColor(COLOR_BTNFACE));
m_b1.GetWindowRect( r);
if(h==16)h=11;//volta ao chegar ao fim
}
if(v==12){ m_b12.SetCor(GetSysColor(COLOR_BTNFACE));m_b13.SetCor(GetSysColor(COLOR_BTNFACE)); m_b14.SetCor(GetSysColor(COLOR_BTNFACE));m_b15.SetCor(GetSysColor(COLOR_BTNFACE)); m_b16.SetCor(GetSysColor(COLOR_BTNFACE));m_b17.SetCor(GetSysColor(COLOR_BTNFACE)); m_b18.SetCor(GetSysColor(COLOR_BTNFACE));m_b19.SetCor(GetSysColor(COLOR_BTNFACE));
m_b20.SetCor(GetSysColor(COLOR_BTNFACE));m_b41.SetCor(GetSysColor(COLOR_BTNFACE)); m_b11.GetWindowRect( r);
if(h==22)h=11;//volta ao chegar ao fim
}
if(v==13){ m_b22.SetCor(GetSysColor(COLOR_BTNFACE));m_b23.SetCor(GetSysColor(COLOR_BTNFACE)); m_b24.SetCor(GetSysColor(COLOR_BTNFACE));m_b25.SetCor(GetSysColor(COLOR_BTNFACE)); m_b26.SetCor(GetSysColor(COLOR_BTNFACE));m_b27.SetCor(GetSysColor(COLOR_BTNFACE));

m_b28.SetCor(GetSysColor(COLOR_BTNFACE));m_b29.SetCor(GetSysColor(COLOR_BTNFACE));

m_b30.SetCor(GetSysColor(COLOR_BTNFACE));m_b42.SetCor(GetSysColor(COLOR_BTNFACE)); m_b21.GetWindowRect( r);
if(h==22)h=11;//volta ao chegar ao fim
}
if(v==14){ m_b32.SetCor(GetSysColor(COLOR_BTNFACE));m_b33.SetCor(GetSysColor(COLOR_BTNFACE)); m_b34.SetCor(GetSysColor(COLOR_BTNFACE));m_b35.SetCor(GetSysColor(COLOR_BTNFACE)); m_b36.SetCor(GetSysColor(COLOR_BTNFACE));m_b37.SetCor(GetSysColor(COLOR_BTNFACE)); m_b38.SetCor(GetSysColor(COLOR_BTNFACE));m_b39.SetCor(GetSysColor(COLOR_BTNFACE)); m_b40.SetCor(GetSysColor(COLOR_BTNFACE));m_b43.SetCor(GetSysColor(COLOR_BTNFACE)); m_b8.SetCor(GetSysColor(COLOR_BTNFACE));m_b9.SetCor(GetSysColor(COLOR_BTNFACE));
m_b7.SetCor(GetSysColor(COLOR_BTNFACE));m_bfechar.SetCor(GetSysColor(COLOR_BTNFACE)
);
m_b31.GetWindowRect( r);
if(h==28)h=11;//volta ao chegar ao fim
}
alt=r.top;
// Corre a Lista
if(v==15){ CRect r;
m_clist3.GetWindowRect(r); int cont=m_clist3.GetCount(); m_clist3.SetCurSel(h-11); if(h==21 ||h==(cont+11)){
h=11;
m_clist3.SetCurSel(0);
}
}
//verifica a distancia p/ prox cursor
if(v!=15){

if(h==11)m_b11.GetWindowRect(r);if(h==12)m_b12.GetWindowRect(r);if(h==13)m_b13.GetW indowRect(r);

if(h==14)m_b14.GetWindowRect(r);if(h==15)m_b15.GetWindowRect(r);if(h==16)m_b16.GetW indowRect(r);

if(h==17)m_b17.GetWindowRect(r);if(h==18)m_b18.GetWindowRect(r);if(h==19)m_b19.GetW indowRect(r);

if(h==20)m_b20.GetWindowRect(r);if(h==21)m_b41.GetWindowRect(r);if(h==22)m_b9.GetWi ndowRect(r);

if(h==23)m_b8.GetWindowRect(r);if(h==24)m_b7.GetWindowRect(r);if(h==25)m_bfechar.Ge tWindowRect(r);
//botao maior
if(v==11){

if(h==11)m_b1.GetWindowRect(r);if(h==12)m_b2.GetWindowRect(r);if(h==13)m_b3.GetWind owRect(r);
if(h==14)m_b4.GetWindowRect(r); if(h==15)m_b5.GetWindowRect(r);
}
lar=r.left;
SetCursorPos(lar+r.Width()-4,alt+r.Height()-4);
}
}
CDialog::OnTimer(nIDEvent);
}

//*********************************************************************************
****
bool CTecladoVirtualDlg::SintetizadorAbrir(CString frase)
{
// Fecha o sintetizador SintetizadorFechar(); TTSMODEINFO TTSModeInfo;
TTSMODEINFO ttsmiTemp; PITTSFIND pITTSFind;
// inicializa o OLE
if (FAILED(CoInitialize(NULL)))return false;
// Cria o objeto Multimedia Audio Destination
if	(FAILED(CoCreateInstance(CLSID_MMAudioDest,	NULL,	CLSCTX_ALL, IID_IAudioMultiMediaDevice, (void**) &pIAMM)))
return false;
pIAMM->DeviceNumSet(WAVE_MAPPER);
// Cria o enumerador do Text-To-Speech
if (FAILED(CoCreateInstance(CLSID_TTSEnumerator, NULL, CLSCTX_ALL,IID_ITTSFind, (void**) &pITTSFind))){
pIAMM->Release();
return false;
}
ZeroMemory(&ttsmiTemp, sizeof(ttsmiTemp));
// Define o idioma (português)
ttsmiTemp.language.LanguageID	=	MAKELANGID(LANG_PORTUGUESE, SUBLANG_PORTUGUESE_BRAZILIAN);
// Define o tipo de voz Masculina ou Feminina if(config.masculino==1)ttsmiTemp.wGender = GENDER_FEMALE; else ttsmiTemp.wGender = GENDER_MALE;
ttsmiTemp.wAge = TTSAGE_ADULT;
// Encontra o engine baseado nas configurações,acima
if (FAILED(pITTSFind->Find(&ttsmiTemp, NULL, &TTSModeInfo))){ pIAMM->Release();
pITTSFind->Release();
return false;
}
// Seleciona o modo Text-To-Speech
if	(FAILED(pITTSFind->Select(TTSModeInfo.gModeID,	&pITTSCentral,	(LPUNKNOWN) pIAMM))){
pIAMM->Release(); pITTSFind->Release(); return false;
}
pITTSFind->Release(); SDATA sdata;
// Faz a montagem do texto int tam = frase.GetLength(); sdata.dwSize=tam+1;
sdata.pData = (CHAR *) malloc( sdata.dwSize); strcpy((CHAR*)sdata.pData, frase);
// Envia o texto para o engine
if	(FAILED(pITTSCentral->TextData(CHARSET_TEXT	,	0,	sdata,	NULL, IID_ITTSBufNotifySinkW))){
return false;
}
// libera
free(sdata.pData);
// Retorna true, para não enviar a mensagem de erro
return true;
}
//*********************************************************************************
****
void CTecladoVirtualDlg::SintetizadorFechar()
{
//***************************
// Fecha o sintetizador *
//***************************
if ( pIAMM ) {

pIAMM->Release(); pIAMM = NULL;

}
if ( pITTSCentral ) { pITTSCentral->Release(); pITTSCentral = NULL;
}
}
//*********************************************************************************
****
void CTecladoVirtualDlg::Enviar(char letra)
{
//***********************************************
// Envia o caractere para o outro aplicativo *
//***********************************************
// Pega o estado da letra
int estado = HIBYTE(VkKeyScan(letra));
// Pressiona Shift, control ou menu, se necessário
if (estado & 0x0001)keybd_event (VK_SHIFT,0,0,0); if (estado & 0x0002)keybd_event (VK_CONTROL,0,0,0); if (estado & 0x0004)keybd_event (VK_MENU,0,0,0);
// Envia o evento de pressionar a tecla ao aplicativo
keybd_event (VkKeyScan(letra),MapVirtualKey (letra, 0),0,0);
// Solta a tecla
keybd_event (VkKeyScan(letra),MapVirtualKey (letra, 0),KEYEVENTF_KEYUP,0);
// Solta a tecla
if (estado & 0x0004)keybd_event (VK_MENU,0,KEYEVENTF_KEYUP,0);
if (estado & 0x0002)keybd_event (VK_CONTROL,0,KEYEVENTF_KEYUP,0);
if (estado & 0x0001)keybd_event (VK_SHIFT,0,KEYEVENTF_KEYUP,0);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnBotao()
{
//***************************************
// Cada tecla clicada executa a função *
//*************************************** CString letra,temp; m_b11.GetWindowText(letra);
// Botão Lista de predição
if(config.historico==1 && config.tamanho==2){ m_clist1.SetWindowPos(NULL,2,2,430,83,NULL); m_clist3.SetWindowPos(NULL,435,2,148,193,NULL); m_cedit1.SetWindowPos(NULL,2,89,430,25,NULL);
}
else if(config.historico==1 && config.tamanho==1){ m_clist1.SetWindowPos(NULL,2,2,320,61,NULL); m_clist3.SetWindowPos(NULL,322,2,113,142,NULL); m_cedit1.SetWindowPos(NULL,2,65,320,18,NULL);
}
else if(config.historico==0 && config.tamanho==2){ m_clist1.SetWindowPos(NULL,2,2,0,0,NULL); m_clist3.SetWindowPos(NULL,435,2,148,100,NULL); m_cedit1.SetWindowPos(NULL,2,2,430,25,NULL);
}
else if(config.historico==0 && config.tamanho==1){ m_clist1.SetWindowPos(NULL,2,2,0,0,NULL); m_clist3.SetWindowPos(NULL,322,2,113,73,NULL); m_cedit1.SetWindowPos(NULL,2,2,320,18,NULL);
}

// Botões de funções
// Tela opções
if(m_b7.m_cima==1){	//associado a tecla Opções
if(config.varredura==1){ m_dir=0; m_b18.SetFocus();

//	MessageBox("");
KillTimer(1);
}
COpcaoDlg opcao; opcao.DoModal();
}//abre a janela opcao
if(m_b8.m_cima==1)Outras();		//associado a tecle Num. if(m_b9.m_cima==1)Outras();		//associado a tecla Espec. if(m_bfechar.m_cima==1){	//associado a tecla Fechar
ConfSalvar(); exit(0);
}
// Botões do teclado exibindo letras
if (letra=="a" || letra=="A" || letra=="q" || letra=="Q" ){ if (m_b11.m_cima==1){m_vedit1+=m_b11.Letra();Completar();} if (m_b12.m_cima==1){m_vedit1+=m_b12.Letra();Completar();} if (m_b13.m_cima==1){m_vedit1+=m_b13.Letra();Completar();} if (m_b14.m_cima==1){m_vedit1+=m_b14.Letra();Completar();} if (m_b15.m_cima==1){m_vedit1+=m_b15.Letra();Completar();} if (m_b16.m_cima==1){m_vedit1+=m_b16.Letra();Completar();} if (m_b17.m_cima==1){m_vedit1+=m_b17.Letra();Completar();} if (m_b18.m_cima==1){m_vedit1+=m_b18.Letra();Completar();} if (m_b19.m_cima==1){m_vedit1+=m_b19.Letra();Completar();} if (m_b20.m_cima==1){m_vedit1+=m_b20.Letra();Completar();} if (m_b21.m_cima==1){m_vedit1+=m_b21.Letra();Completar();} if (m_b22.m_cima==1){m_vedit1+=m_b22.Letra();Completar();} if (m_b23.m_cima==1){m_vedit1+=m_b23.Letra();Completar();} if (m_b24.m_cima==1){m_vedit1+=m_b24.Letra();Completar();} if (m_b25.m_cima==1){m_vedit1+=m_b25.Letra();Completar();} if (m_b26.m_cima==1){m_vedit1+=m_b26.Letra();Completar();} if (m_b27.m_cima==1){m_vedit1+=m_b27.Letra();Completar();} if (m_b28.m_cima==1){m_vedit1+=m_b28.Letra();Completar();} if (m_b29.m_cima==1){m_vedit1+=m_b29.Letra();Completar();} if (m_b31.m_cima==1){m_vedit1+=m_b31.Letra();Completar();} if (m_b32.m_cima==1){m_vedit1+=m_b32.Letra();Completar();} if (m_b33.m_cima==1){m_vedit1+=m_b33.Letra();Completar();} if (m_b34.m_cima==1){m_vedit1+=m_b34.Letra();Completar();} if (m_b35.m_cima==1){m_vedit1+=m_b35.Letra();Completar();} if (m_b36.m_cima==1){m_vedit1+=m_b36.Letra();Completar();} if (m_b37.m_cima==1){m_vedit1+=m_b37.Letra();Completar();}
// Sugere palavras na lista que completam o que está sendo digitado ou predizem a
inicial se houve ponto ou virgula
if (m_b41.m_cima==1 ||m_b42.m_cima==1){	// se ponto final ou vírgula, use Pi x B
m_vedit1.TrimRight();	// se apertou antes OnFrente, limpa espaço
if (m_b41.m_cima==1)m_vedit1+=m_b41.Letra(); // escreve vírgula if (m_b42.m_cima==1)m_vedit1+=m_b42.Letra(); // escreve ponto m_vedit1+=" ";
Predicao();
}
//else if (m_vedit1!="")Completar();

if (m_b30.m_cima==1 && config.acento=="^")m_vedit1+="^";
else if (m_b30.m_cima==1 && config.acento!="^")config.acento="^";
if (m_b38.m_cima==1 && config.acento=="´")m_vedit1+="´";
else if (m_b38.m_cima==1 && config.acento!="´")config.acento="´";
if (m_b39.m_cima==1 && config.acento=="~")m_vedit1+="~";
else if (m_b39.m_cima==1 && config.acento!="~")config.acento="~";
if (m_b40.m_cima==1 && config.acento=="`")m_vedit1+="`";
else if (m_b40.m_cima==1 && config.acento!="`")config.acento="`";


// Letras maiúsculas ou minúsculas
if (m_b43.m_cima==1){ if(config.maiuscula==1)config.maiuscula=0; else config.maiuscula=1;
CString letra;m_b11.GetWindowText(letra); letra.MakeLower(); if(letra=="a")FormatoABC();

else FormatoQWE();
}
//** Conta Clique m_veditContaClique++; UpdateData(false);
}
// Botões do teclado exibindo caracteres especiais
if (letra=="[ESC]"){
int cont=0;
char aplic[256];
HWND hWnd = ::FindWindow (NULL, NULL);
while (hWnd && cont<=1){
::GetWindowText (hWnd, aplic, 255);
if (aplic [0] != 0 && ::IsWindowVisible (hWnd)){
::SetForegroundWindow(hWnd); cont++;
}
hWnd = ::GetNextWindow (hWnd, GW_HWNDNEXT);
}
// Envia os comandos ao aplicativo externo
if (m_b11.m_cima==1)keybd_event (VK_ESCAPE,0,0,0);
if (m_b12.m_cima==1)keybd_event (VK_UP,0,0,0); if (m_b13.m_cima==1)keybd_event (VK_TAB,0,0,0); if (m_b14.m_cima==1)keybd_event (VK_F1,0,0,0); if (m_b15.m_cima==1)keybd_event (VK_F2,0,0,0); if (m_b16.m_cima==1)keybd_event (VK_F3,0,0,0); if (m_b17.m_cima==1)keybd_event (VK_F4,0,0,0); if (m_b18.m_cima==1)keybd_event (VK_F5,0,0,0); if (m_b19.m_cima==1)keybd_event (VK_F6,0,0,0); if (m_b20.m_cima==1)keybd_event (VK_F7,0,0,0); if (m_b41.m_cima==1)keybd_event (VK_F8,0,0,0); if (m_b21.m_cima==1)keybd_event (VK_LEFT,0,0,0); if (m_b22.m_cima==1)m_vedit1+=m_b22.Letra();
if (m_b23.m_cima==1)keybd_event (VK_RIGHT,0,0,0);
if (m_b26.m_cima==1)m_vedit1+="&";
if (m_b27.m_cima==1)m_vedit1+=m_b27.Letra();
if (m_b28.m_cima==1)m_vedit1+=m_b28.Letra();
if (m_b29.m_cima==1)keybd_event (VK_INSERT,0,0,0); if (m_b30.m_cima==1)keybd_event (VK_HOME,0,0,0); if (m_b42.m_cima==1)keybd_event (VK_PRIOR,0,0,0); if (m_b31.m_cima==1)m_vedit1+=m_b31.Letra();
if (m_b32.m_cima==1)keybd_event (VK_DOWN,0,0,0);
if (m_b33.m_cima==1)m_vedit1+=m_b33.Letra(); if (m_b36.m_cima==1)m_vedit1+=m_b36.Letra(); if (m_b37.m_cima==1)m_vedit1+=m_b37.Letra(); if (m_b38.m_cima==1)m_vedit1+=m_b38.Letra();
if (m_b39.m_cima==1)keybd_event (VK_DELETE,0,0,0); if (m_b40.m_cima==1)keybd_event (VK_END,0,0,0); if (m_b43.m_cima==1)keybd_event (VK_NEXT,0,0,0);
// Sugere palavras na lista que completam o que está sendo digitado ou predizem a inicial
if	(m_b24.m_cima==1||m_b25.m_cima==1||m_b34.m_cima==1||m_b35.m_cima==1){
// se houve pontuação, use Pi x B
m_vedit1.TrimRight();	// se apertou anteriormente OnFrente, remove o espaço
if (m_b24.m_cima==1)m_vedit1+=m_b24.Letra(); // escreve ":" if (m_b25.m_cima==1)m_vedit1+=m_b25.Letra(); // escreve "!" if (m_b34.m_cima==1)m_vedit1+=m_b34.Letra(); // escreve ";" if (m_b35.m_cima==1)m_vedit1+=m_b35.Letra(); // escreve "?" m_vedit1+=" ";
Predicao();
}
else if (m_vedit1!="")Completar();
}
// Botões do teclado exibindo a calculadora
if (letra=="Calc."){
if (m_b11.m_cima==1){::WinExec("calc", SW_SHOW);config.externo=true;}
if (m_b12.m_cima==1)m_vedit1+=m_b12.Letra();

if (m_b13.m_cima==1)m_vedit1+=m_b13.Letra(); if (m_b14.m_cima==1)m_vedit1+=m_b14.Letra(); if (m_b15.m_cima==1)m_vedit1+=m_b15.Letra(); if (m_b16.m_cima==1)m_vedit1+=m_b16.Letra(); if (m_b17.m_cima==1)m_vedit1+=m_b17.Letra(); if (m_b18.m_cima==1)m_vedit1+=m_b18.Letra(); if (m_b19.m_cima==1)m_vedit1+=m_b19.Letra(); if (m_b20.m_cima==1)m_vedit1+=m_b20.Letra(); if (m_b41.m_cima==1)m_vedit1+=m_b41.Letra();
if (m_b21.m_cima==1){::WinExec("notepad", SW_SHOW);config.externo=true;}
if (m_b22.m_cima==1)m_vedit1+=m_b22.Letra(); if (m_b23.m_cima==1)m_vedit1+=m_b23.Letra(); if (m_b24.m_cima==1)m_vedit1+=m_b24.Letra(); if (m_b25.m_cima==1)m_vedit1+=m_b25.Letra(); if (m_b26.m_cima==1)m_vedit1+=m_b26.Letra(); if (m_b27.m_cima==1)m_vedit1+=m_b27.Letra(); if (m_b28.m_cima==1)m_vedit1+=m_b28.Letra(); if (m_b29.m_cima==1)m_vedit1+=m_b29.Letra(); if (m_b30.m_cima==1)m_vedit1+=m_b30.Letra(); if (m_b42.m_cima==1)m_vedit1+=m_b42.Letra();
if (m_b31.m_cima==1){::system("start iexplore");config.externo=true;} if (m_b32.m_cima==1){::system("start winword");config.externo=true;} if (m_b33.m_cima==1){::system("start excel");config.externo=true;}
if (m_b34.m_cima==1){WinExec("hh.exe ""./AjudaTeclado.chm" ,SW_SHOW);}
if (m_b35.m_cima==1)OnImprimir();
if (m_b36.m_cima==1)m_vedit1+=m_b36.Letra(); if (m_b37.m_cima==1)m_vedit1+=m_b37.Letra(); if (m_b38.m_cima==1)m_vedit1+=m_b38.Letra(); if (m_b39.m_cima==1)m_vedit1+=m_b39.Letra(); if (m_b40.m_cima==1)m_vedit1+=m_b40.Letra(); if (m_b43.m_cima==1)m_vedit1+=m_b43.Letra();
}

// Botões superiores if(m_b1.m_cima==1)OnLimpar(); if(m_b2.m_cima==1)OnVoltar(); if(m_b3.m_cima==1)OnTras(); if(m_b4.m_cima==1)OnFrente(); if(m_b5.m_cima==1)OnEnter();

//Lista de Predição
if(m_clist3.m_cima==1)OnLista();

// Leva cursor à ultima letra
m_cedit1.SetFocus(); m_cedit1.SetSel(m_vedit1.GetLength(),m_vedit1.GetLength(),true);

}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnLimpar()
{
//*******************
// Botão limpar *
//*******************
// Limpa a área de texto m_vedit1.Empty(); indPred=0; Predicao();
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnVoltar()
{
//***************************************
// Botão voltar (retorna uma palavra) *
//***************************************

// Apaga os caracteres da frase até achar um espaço, ou seja, apaga última palavra
UpdateData(false); m_vedit1.TrimRight(); UpdateData(false);
int x=m_vedit1.ReverseFind(' ')+1;
if(x>0){ m_vedit1.Delete(x,m_vedit1.GetLength()-x); indPred--;
Predicao();
}
else OnLimpar();
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnTras()
{
//***********************
// Volta um caractere *
//*********************** int cont=0; if(!m_vedit1.IsEmpty()){
if(m_vedit1.Right(1)==" ")indPred--;
m_vedit1.Delete(m_vedit1.GetLength()-1,1);	// Retira o último caractere
UpdateData(false);
if (m_vedit1.IsEmpty()){
Predicao(); //se ficar vazio, Iniciar novamente
}
else Completar(); // Pesquisa as palavras na lista
}
else {	// Se estiver vazia a frase e habilitado o uso externo,
if(config.externo==1){ //acha o ultimo processo e faz o backspace
HWND hWnd = ::FindWindow (NULL, NULL);
char aplic[256];
while (hWnd && cont<=1){
::GetWindowText (hWnd, aplic, 255);
if (aplic [0] != 0 && ::IsWindowVisible (hWnd)){
::SetForegroundWindow(hWnd); cont++;
}
hWnd = ::GetNextWindow (hWnd, GW_HWNDNEXT);
}
keybd_event (VK_BACK,0,0,0);
}
}
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnFrente()
{
//*****************************
// Adiciona apenas um espaço *
//*****************************
char aplic[256];
if(m_vedit1.GetLength()<0){ // Se estiver vazia a frase e habilitado o uso externo, então
// acha o ultimo processo e avança no aplicativo
if(config.externo==1){
HWND hWnd = ::FindWindow (NULL, NULL);
int cont=0;
while (hWnd && cont<=1){
::GetWindowText (hWnd, aplic, 255);
if (aplic [0] != 0 && ::IsWindowVisible (hWnd)){
::SetForegroundWindow(hWnd); cont++;
}
hWnd = ::GetNextWindow (hWnd, GW_HWNDNEXT);
}
keybd_event (VK_SPACE,0,0,0);

}
}
else if(m_vedit1.GetLength()>0){ UpdateData(false);
bool incrementa=true,inicio=ChecaInicio(); CString palavra=m_vedit1;
if (m_vedit1.Right(1)==" ")incrementa=false; palavra.Delete(0,palavra.ReverseFind(' ')+1);
// Adiciona o espaço m_vedit1.TrimRight(); m_vedit1+=" "; UpdateData(false);
// Quando o usuário digita uma palavra, pesquisa na matriz de busca
int i,j,k,m;
double Valor=0;
bool achou=false,emPi=false;
for(i=0;i<=fimDaLista;i++)mtzPred[indPred].lstPred[i].Resultado=0;	//Limpa lista atual
if(inicio){ //Use Pi x B se estiver em Pi:
for(i=0;i<numPalavrasDiferentes;i++){//Para	cada	palavra	da	matriz	de busca...
if(palavra.CompareNoCase(MatrizDeBusca[i].Palavra)==0){	//ache	o	que corresponder à palavra digitada...
for(j=0;j<numClassesDaPalavra;j++){	//para	cada	classe	da	palavra encontrada...
mtzPred[indPred].classe[j]=MatrizDeBusca[i].parB[j].indClasse; mtzPred[indPred].delta[j]=VetorPi[mtzPred[indPred].classe[j]]*

MatrizB1[mtzPred[indPred].classe[j]].Probabilidade[MatrizDeBusca[i].parB[j].PosiB];
if(mtzPred[indPred].delta[j]>0)emPi=true;
}
}
}
if(!emPi){
for(i=0;i<numClassesDaPalavra;i++)mtzPred[indPred].delta[i]=0;	//limpa deltas atuais
for(i=0;i<NumeroDeClasses;i++){ //para cada Pi...
m=-1;
for(j=0;j<numClassesDaPalavra;j++){ //para cada delta atual
if(VetorPi[i]>mtzPred[indPred].delta[j])m=j; else break; //sai do loop
}
if(m>=0){	//se Pi maior que algum delta atual, encaixa Pi na listagem delta atual
for(j=0;j<m;j++){ mtzPred[indPred].delta[j]=mtzPred[indPred].delta[j+1]; mtzPred[indPred].classe[j]=mtzPred[indPred].classe[j+1];
}
mtzPred[indPred].delta[m]=VetorPi[i]; mtzPred[indPred].classe[m]=i;
}
}
}
}
else{ //Viterbi
for(i=0;i<numPalavrasDiferentes;i++){//para	cada	palavra	da	matriz	de busca...
if(palavra.CompareNoCase(MatrizDeBusca[i].Palavra)==0){	//ache	o	que corresponder à palavra digitada...
achou=true;
for(j=0;j<numClassesDaPalavra;j++){//Para	cada	classe	da	palavra encontrada...
mtzPred[indPred].delta[j]=0; mtzPred[indPred].classe[j]=MatrizDeBusca[i].parB[j].indClasse; for(k=0;k<numClassesDaPalavra;k++){//use cada delta anterior...
if(mtzPred[indPred-1].delta[k]*MatrizA[mtzPred[indPred-1].classe[k]] [mtzPred[indPred].classe[j]]>mtzPred[indPred].delta[j]){
mtzPred[indPred].delta[j]=mtzPred[indPred-1].delta[k]*

MatrizA[mtzPred[indPred- 1].classe[k]][mtzPred[indPred].classe[j]];
}
}
mtzPred[indPred].delta[j]=mtzPred[indPred].delta[j]*

MatrizB1[mtzPred[indPred].classe[j]].Probabilidade[MatrizDeBusca[i].parB[j].PosiB];
}
}
}
if(!achou){
for(i=0;i<numClassesDaPalavra;i++)mtzPred[indPred].delta[i]=0;	//limpa deltas atuais
for(i=0;i<NumeroDeClasses;i++){	//para cada classe de destino na matriz
A...
for(j=0;j<numClassesDaPalavra;j++){ //para classe de origem no delta
anterior...
Valor=mtzPred[indPred-1].delta[j]*MatrizA[mtzPred[indPred-
1].classe[j]][i];
//Classificador:
m=-1;
for(k=0;k<numClassesDaPalavra;k++){ //Se Valor > que algum delta atual, encaixe a classe...
if(Valor>mtzPred[indPred].delta[k])m=k; else break; //sai do loop
}
if(m>=0){	//se delta(n-1) * A (todas) maior que algum delta atual, encaixa valor...
for(k=0;k<m;k++){ mtzPred[indPred].delta[k]=mtzPred[indPred].delta[k+1]; mtzPred[indPred].classe[k]=mtzPred[indPred].classe[k+1];
}
mtzPred[indPred].delta[m]=Valor; mtzPred[indPred].classe[m]=i;
}
}
}
}
}
if(incrementa==true){ indPred++; Predicao();
}
}
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnEnter()
{
//***********************
// Botão enter clicado *
//***********************
// Aciona o sintetizador UpdateData(false); if(config.som>0){
if(SintetizadorAbrir(m_vedit1)==false){
MessageBox("Não foi possível iniciar o sintetizador.","ERRO",MB_ICONERROR);
}
}
int tam=0;
tam = m_vedit1.GetLength();
int cont=0;
char aplic[256];
// Acha o ultimo processo
if(config.externo==1){
HWND hWnd = ::FindWindow (NULL, NULL);
while (hWnd && cont<=1){
::GetWindowText (hWnd, aplic, 255);

if (aplic [0] != 0 && ::IsWindowVisible (hWnd)){
::SetForegroundWindow(hWnd); cont++;
}
hWnd = ::GetNextWindow (hWnd, GW_HWNDNEXT);
}
}
// Envia ao outro aplicativo
if(config.externo==1 && tam>0){ char *texto=new char[tam]; strcpy(texto,m_vedit1); for(int i=0;i<tam;i++){
char letra=texto[i];
if	(letra=='á'){Enviar('´');Enviar('a');}
else if(letra=='à'){Enviar('`');Enviar('a');}
else if(letra=='ã'){Enviar('~');Enviar('a');}
else if(letra=='â'){Enviar('^');Enviar('a');}
else if(letra=='Á'){Enviar('´');Enviar('A');}
else if(letra=='À'){Enviar('`');Enviar('A');}
else if(letra=='Ã'){Enviar('~');Enviar('A');}
else if(letra==' '){Enviar('^');Enviar('A');}

else if(letra=='é'){Enviar('´');Enviar('e');}
else if(letra=='è'){Enviar('`');Enviar('e');}
else if(letra=='ê'){Enviar('^');Enviar('e');}
else if(letra=='É'){Enviar('´');Enviar('E');}
else if(letra=='È'){Enviar('`');Enviar('E');}
else if(letra=='Ê'){Enviar('^');Enviar('E');}

else if(letra=='í'){Enviar('´');Enviar('i');}
else if(letra=='ì'){Enviar('`');Enviar('i');}
else if(letra=='î'){Enviar('^');Enviar('i');}
else if(letra=='Í'){Enviar('´');Enviar('I');}
else if(letra=='Ì'){Enviar('`');Enviar('I');}
else if(letra=='Î'){Enviar('^');Enviar('I');}

else if(letra=='ó'){Enviar('´');Enviar('o');}
else if(letra=='ò'){Enviar('`');Enviar('o');}
else if(letra=='ô'){Enviar('^');Enviar('o');}
else if(letra=='õ'){Enviar('~');Enviar('o');}
else if(letra=='Ó'){Enviar('´');Enviar('O');}
else if(letra=='Ò'){Enviar('`');Enviar('O');}
else if(letra=='Ô'){Enviar('^');Enviar('O');}
else if(letra=='Õ'){Enviar('~');Enviar('O');}

else if(letra=='ú'){Enviar('´');Enviar('u');}
else if(letra=='ù'){Enviar('`');Enviar('u');}
else if(letra=='û'){Enviar('^');Enviar('u');}
else if(letra=='Ú'){Enviar('´');Enviar('U');}
else if(letra=='Ù'){Enviar('`');Enviar('U');}
else if(letra=='Û'){Enviar('^');Enviar('U');} else Enviar(letra);
}
::Sleep(500);
HWND hWnd = ::FindWindow (NULL,NULL); hWnd = ::FindWindow (NULL,NULL);
::SetForegroundWindow(hWnd);
}
// Se a frase estiver vazia e o botão enter presionado
if(config.externo==1 && tam==0){ keybd_event (VK_RETURN,0,0,0);
}
// Se tiver digitado algo ao p. enter
if(tam>0){
// Adiciona o tempo e a frase no historico
char time[10];
_strtime(time);
CString texto=m_vedit1,texto2;

CString temp="("; temp+=time; temp+=") ";
// Pula linha
while(texto.GetLength()>44){ texto2=texto; texto.Delete(44,texto.GetLength()-44); texto2.Delete(0,44);
temp+=texto; m_clist1.AddString(temp); texto=texto2;
temp="	";
}
temp+=texto; m_clist1.AddString(temp);
// Rola a lista de histórico quando as 4 linhas já estiverem cheias if(m_clist1.GetCount()>4)m_clist1.DeleteString(0); m_clist1.SetCurSel(m_clist1.GetCount()-1);
m_vedit1.Empty();	//a	atualização	dos	controles	do	diálogo	será	em CarregaLista(0)
// Faz a predicao indPred=0; Predicao();
}
}//********************************************************************************
****
void CTecladoVirtualDlg::Outras()
{
//*******************************
// exibe os botões de funções *
//******************************* CString texto,texto1,texto2; m_b9.GetWindowText(texto1); m_b8.GetWindowText(texto2);
if(m_b9.m_cima==1){m_b9.GetWindowText(texto);} if(m_b8.m_cima==1){m_b8.GetWindowText(texto);}
// Exibe no teclado os caracteres especiais
if(texto=="Espec."){
m_b11.SetWindowText("[ESC]");	m_b12.SetWindowText("^"); m_b13.SetWindowText("[TAB]");
m_b14.SetWindowText("[F1]");	m_b15.SetWindowText("[F2]"); m_b16.SetWindowText("[F3]");
m_b17.SetWindowText("[F4]");	m_b18.SetWindowText("[F5]"); m_b19.SetWindowText("[F6]");
m_b20.SetWindowText("[F7]"); m_b41.SetWindowText("[F8]");



>");

m_b21.SetWindowText("<-");	m_b22.SetWindowText("@"); m_b23.SetWindowText("-

m_b24.SetWindowText(":"); m_b25.SetWindowText("!"); m_b26.SetWindowText("&&"); m_b27.SetWindowText("*");	m_b28.SetWindowText("|");

m_b29.SetWindowText("[Ins]");
m_b30.SetWindowText("[Home]"); m_b42.SetWindowText("[P.Up]");

m_b31.SetWindowText("\'");	m_b32.SetWindowText("v"); m_b33.SetWindowText("\"");
m_b34.SetWindowText(";"); m_b35.SetWindowText("?"); m_b36.SetWindowText("#"); m_b37.SetWindowText("$");	m_b38.SetWindowText("%");
m_b39.SetWindowText("[Del]");
m_b40.SetWindowText("[End]"); m_b43.SetWindowText("[Down]");
}
// Exibe no teclado os números
if(texto=="Num."){ config.numero=true;

m_b11.SetWindowText("Calc.");	m_b12.SetWindowText("1"); m_b13.SetWindowText("2");
m_b14.SetWindowText("3"); m_b15.SetWindowText("4"); m_b16.SetWindowText("5"); m_b17.SetWindowText("6"); m_b18.SetWindowText("7"); m_b19.SetWindowText("8");

m_b20.SetWindowText("9"); m_b41.SetWindowText("0");



");

m_b21.SetWindowText("Notas"); m_b22.SetWindowText("+"); m_b23.SetWindowText("-

m_b24.SetWindowText("*"); m_b25.SetWindowText("/"); m_b26.SetWindowText("%"); m_b27.SetWindowText("="); m_b28.SetWindowText(""); m_b29.SetWindowText(""); m_b30.SetWindowText(""); m_b42.SetWindowText("");


m_b31.SetWindowText("Internet");	m_b32.SetWindowText("Word"); m_b33.SetWindowText("Excel");
m_b34.SetWindowText("Ajuda");	m_b35.SetWindowText("Imprimir"); m_b36.SetWindowText("(");
m_b37.SetWindowText(")"); m_b38.SetWindowText("["); m_b39.SetWindowText("]"); m_b40.SetWindowText("<"); m_b43.SetWindowText(">");
}
// Exibe no teclado as letras
if(texto=="Letras"){ if(config.formato=="abcde")FormatoABC();
else if(config.formato=="qwert")FormatoQWE();
}
// Desabilita os botões sem uso externo
if(config.externo==false && texto=="Espec."){ m_b11.EnableWindow(false);m_b12.EnableWindow(false);m_b13.EnableWindow(false); m_b14.EnableWindow(false);m_b15.EnableWindow(false);m_b16.EnableWindow(false); m_b17.EnableWindow(false);m_b18.EnableWindow(false);m_b19.EnableWindow(false); m_b20.EnableWindow(false);m_b41.EnableWindow(false); m_b21.EnableWindow(false);m_b23.EnableWindow(false); m_b32.EnableWindow(false);

m_b29.EnableWindow(false);m_b30.EnableWindow(false); m_b39.EnableWindow(false);m_b40.EnableWindow(false); m_b42.EnableWindow(false);m_b43.EnableWindow(false);
}
else if(texto!="Espec."){ m_b11.EnableWindow(true);m_b12.EnableWindow(true);m_b13.EnableWindow(true); m_b14.EnableWindow(true);m_b15.EnableWindow(true);m_b16.EnableWindow(true); m_b17.EnableWindow(true);m_b18.EnableWindow(true);m_b19.EnableWindow(true); m_b20.EnableWindow(true);m_b41.EnableWindow(true); m_b21.EnableWindow(true);m_b23.EnableWindow(true); m_b32.EnableWindow(true);

m_b29.EnableWindow(true);m_b30.EnableWindow(true); m_b39.EnableWindow(true);m_b40.EnableWindow(true); m_b42.EnableWindow(true);m_b43.EnableWindow(true);
}

if(m_b9.m_cima==1	&&	texto1=="Espec."	&& texto2=="Num."){m_b9.SetWindowText("Letras");}
if(m_b8.m_cima==1	&&	texto1=="Espec."	&& texto2=="Num."){m_b8.SetWindowText("Letras");}
if(m_b9.m_cima==1	&&	texto2=="Espec."	&& texto1=="Num."){m_b9.SetWindowText("Letras");}
if(m_b8.m_cima==1	&&	texto2=="Espec."	&& texto1=="Num."){m_b8.SetWindowText("Letras");}
if(m_b9.m_cima==1	&&	texto1=="Letras"	&& texto2=="Num."){m_b9.SetWindowText("Espec.");}
if(m_b8.m_cima==1	&&	texto1=="Letras"	&& texto2=="Num."){m_b8.SetWindowText("Espec.");}
if(m_b9.m_cima==1	&&	texto2=="Letras"	&& texto1=="Num."){m_b9.SetWindowText("Espec.");}
if(m_b8.m_cima==1	&&	texto2=="Letras"	&& texto1=="Num."){m_b8.SetWindowText("Espec.");}
if(m_b9.m_cima==1	&&	texto1=="Espec."	&& texto2=="Letras"){m_b9.SetWindowText("Num.");}
if(m_b8.m_cima==1	&&	texto1=="Espec."	&& texto2=="Letras"){m_b8.SetWindowText("Num.");}

if(m_b9.m_cima==1	&&	texto2=="Espec."	&& texto1=="Letras"){m_b9.SetWindowText("Num.");}
if(m_b8.m_cima==1	&&	texto2=="Espec."	&& texto1=="Letras"){m_b8.SetWindowText("Num.");}
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnLista()
{
//*****************************
// Após clicar sobre a lista *
//*****************************
bool inicio=ChecaInicio();
int i,j,itemDaLista=m_clist3.GetCurSel();
int linBusca=mtzPred[indPred].lstPred[fimDaLista-itemDaLista].LinMtzBusca; CString txtSeleto=MatrizDeBusca[linBusca].Palavra;
//dá no mesmo que usar... m_clist3.GetText(m_clist3.GetCurSel(),txtSeleto);
//else m_clist3.GetText(indLista,txtSeleto); m_vedit1=m_vedit1.Left(m_vedit1.ReverseFind(' ')+1)+txtSeleto+" "; UpdateData(false);
// Faz a predição
if(inicio){
for(i=0;i<numClassesDaPalavra;i++){	//para	cada	classe	da	palavra escolhida...
mtzPred[indPred].classe[i]=MatrizDeBusca[linBusca].parB[i].indClasse; mtzPred[indPred].delta[i]=VetorPi[mtzPred[indPred].classe[i]]*

MatrizB1[mtzPred[indPred].classe[i]].Probabilidade[MatrizDeBusca[linBusca].parB[i]. PosiB];
}
}
else{ //Viterbi
for(i=0;i<numClassesDaPalavra;i++){ //para cada classe da palavra escolhida...
mtzPred[indPred].delta[i]=0;//inicialmente limpe delta atual e
mtzPred[indPred].classe[i]=MatrizDeBusca[linBusca].parB[i].indClasse;
//memorize sua classe e use-a com...
for(j=0;j<numClassesDaPalavra;j++){ //cada classe do delta anterior...
if(mtzPred[indPred-1].delta[j]*MatrizA[mtzPred[indPred-1].classe[j]] [mtzPred[indPred].classe[i]]>=mtzPred[indPred].delta[i]){
mtzPred[indPred].delta[i]=mtzPred[indPred-1].delta[j]* MatrizA[mtzPred[indPred-1].classe[j]][mtzPred[indPred].classe[i]];
}
}
mtzPred[indPred].delta[i]=mtzPred[indPred].delta[i]*

MatrizB1[mtzPred[indPred].classe[i]].Probabilidade[MatrizDeBusca[linBusca].parB[i]. PosiB];
}
}
indPred++; Predicao();
}
//*********************************************************************************
****
bool CTecladoVirtualDlg::ChecaInicio()
{
//*********************************
//Verifica se é inicio de frase	*
//*********************************
UpdateData(false);
// Deteta se antes da última palavra, na linha temp, houve pontuação
bool inicio=false; CString frase=m_vedit1;
int posiEspaco=frase.ReverseFind(' ');
if(posiEspaco>0){ frase.Delete(0,posiEspaco-1);
if(frase.ReverseFind(' ')-1==frase.FindOneOf(".,:;?!")){ inicio=true;

}
}
else inicio=true;
return inicio;
}
//*********************************************************************************
****
void CTecladoVirtualDlg::Maiores(double valor, int indBusca)
{
int i,j=-1,k=0;
for(i=0;i<=fimDaLista;i++){ //para valor na lista atual(ordenada, decrescente)... if(valor>mtzPred[indPred].lstPred[i].Resultado)j=i; if(indBusca==mtzPred[indPred].lstPred[i].LinMtzBusca)k=i;
}
if(j>=0){	//se delta(n-1) * A (todas) maior que algum delta atual, encaiia valor...
for(i=k;i<j;i++){
mtzPred[indPred].lstPred[i].Resultado=mtzPred[indPred].lstPred[i+1].Resultado; mtzPred[indPred].lstPred[i].LinMtzBusca=mtzPred[indPred].lstPred[i+1].LinMtzBusca;
}
if(j>=k){ mtzPred[indPred].lstPred[j].Resultado=valor; mtzPred[indPred].lstPred[j].LinMtzBusca=indBusca;
}
}
}
//*********************************************************************************
****
void CTecladoVirtualDlg::CarregaLista(int indice)
{
UpdateData(false);
m_clist3.ResetContent(); //Apaga o que houver na lista de predição
for(int i=0;i<=fimDaLista;i++){ //na lista de predição atualmente cabem apenas 10 palavras
if(mtzPred[indice].lstPred[fimDaLista-i].Resultado>0){ m_clist3.AddString(MatrizDeBusca[mtzPred[indice].lstPred[fimDaLista-
i].LinMtzBusca].Palavra);
}
}
// Leva à ultima letra na linha de composição m_cedit1.SetFocus(); m_cedit1.SetSel(m_vedit1.GetLength(),m_vedit1.GetLength(),true); UpdateData(false);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::Predicao()
{
//***********************************************
//Analisa palavras em temp e prediz a próxima	*
//***********************************************
//O cálculo recursivo é feito de "trás para frente" para diminuir esforço computacional
UpdateData(false);
int i,j,k;
double Valor=0;
//char temp[50];
bool inicio=ChecaInicio(),achou=false;
for(i=0;i<=fimDaLista;i++)mtzPred[indPred].lstPred[i].Resultado=0; //Limpa lista atual
if(inicio){ //se inicio, carregue mtzPred[indPred] com Pi x B
for(i=0;i<numPalavrasDiferentes;i++){//para	cada	símbolo	observado	(cada palavra)...
for(j=0;j<numClassesDaPalavra;j++){ //para cada classe dessa palavra:
Valor=VetorPi[MatrizDeBusca[i].parB[j].indClasse]*

MatrizB1[MatrizDeBusca[i].parB[j].indClasse].Probabilidade[MatrizDeBusca[i].parB[j]
.PosiB];
Maiores(Valor,i);
}
}
}
else{//associada ao delta da lista anterior...
for(i=0;i<numPalavrasDiferentes;i++){//para cada cada palavra possível de ser observada...
for(j=0;j<numClassesDaPalavra;j++){ //teste se para cada delta anterior...
if(mtzPred[indPred-1].delta[j]>0){ //que for diferentes de 0...
for(k=0;k<numClassesDaPalavra;k++){//vezes A, para classe da palavra
atual...
Valor=mtzPred[indPred-1].delta[j]* MatrizA[mtzPred[indPred-
1].classe[j]][MatrizDeBusca[i].parB[k].indClasse]*

MatrizB1[MatrizDeBusca[i].parB[k].indClasse].Probabilidade[MatrizDeBusca[i].parB[k]
.PosiB];
Maiores(Valor,i);
//if(Valor>0)achou=true;
}
}
}
}
}
//if(achou==false){
// MessageBox("não achou");
// for(i=0;i<7;i++)MessageBox(ltoa(mtzPred[indPred-1].delta[i],temp,10));
//}
CarregaLista(indPred);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::Completar()
{

//*********************************************************************************
******
//	Quando o usuário digita uma letra, pesquisa na matriz de busca e restringe escopo *

//*********************************************************************************
******
UpdateData(false);
int i,j,k;
double Valor=0;
bool inicio=ChecaInicio(); CString PalavraDaMatriz; CString pedaco=m_vedit1;
for(i=0;i<=fimDaLista;i++)mtzPred[indPred].lstPred[i].Resultado=0; //Limpa lista atual
pedaco.Delete(0,pedaco.ReverseFind(' ')+1);
if(inicio){ // se for inicio, carregue mtzPred[indPred] com Pi x B
for(i=0;i<numPalavrasDiferentes;i++){//para cada cada palavra sendo digitada...
PalavraDaMatriz=MatrizDeBusca[i].Palavra;
if(pedaco.CompareNoCase(PalavraDaMatriz.Left(pedaco.GetLength()))==0){//se houve alguma palavra com o mesmo começo na matriz de busca...
for(j=0;j<numClassesDaPalavra;j++){ //para cada classe da palavra com o mesmo começo...
Valor=VetorPi[MatrizDeBusca[i].parB[j].indClasse]*

MatrizB1[MatrizDeBusca[i].parB[j].indClasse].Probabilidade[MatrizDeBusca[i].parB[j]
.PosiB];
Maiores(Valor,i);
}
}
}

}
else{
for(i=0;i<numPalavrasDiferentes;i++){//para cada palavra sendo digitada...
PalavraDaMatriz=MatrizDeBusca[i].Palavra;
if(pedaco.CompareNoCase(PalavraDaMatriz.Left(pedaco.GetLength()))==0){ for(j=0;j<numClassesDaPalavra;j++){ //para cada delta anterior...
if(mtzPred[indPred-1].delta[j]>0){ //que for diferente de 0...
for(k=0;k<numClassesDaPalavra;k++){//para cada classe da palavra sendo

digitada...

Valor=mtzPred[indPred-1].delta[j]* MatrizA[mtzPred[indPred-

1].classe[j]][MatrizDeBusca[i].parB[k].indClasse]*

MatrizB1[MatrizDeBusca[i].parB[k].indClasse].Probabilidade[MatrizDeBusca[i].parB[k]
.PosiB];
Maiores(Valor,i);
}
}
}
}
}
}
CarregaLista(indPred);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnContaClique()
{
//** Conta Clique m_veditContaClique=0 ; m_cEditContaClique.ZerarContador(); Invalidate();
UpdateData(false);
}
//*********************************************************************************
****
void CTecladoVirtualDlg::OnTempoClique()
{
// TODO: Add your control notification handler code here
//** Conta Clique
CString texto; m_cButtonTempoClique.GetWindowText(texto); if(texto=="Iniciar")
{
m_cButtonTempoClique.SetWindowText("Parar"); UpdateData(true); m_cEditContaClique.SetTimer(1,1000,0);
}
if(texto=="Parar")
{
m_cButtonTempoClique.SetWindowText("Iniciar"); UpdateData(true); m_cEditContaClique.KillTimer(1);
}
UpdateData(false);
}
